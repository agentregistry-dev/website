#----------------------------------------------------------------------------------
# Hugo
#----------------------------------------------------------------------------------

# Production build (GC, minify). Requires node_modules for the Tailwind CLI
# that Hugo's css.TailwindCSS invokes — run `npm install` once beforehand.
.PHONY: build
build:
	hugo160 --gc --minify

# Local dev server (drafts and future-dated content shown).
.PHONY: serve
serve:
	hugo160 server --buildDrafts --buildFuture

# Alias
.PHONY: server
server: serve

# Remove Hugo output and cache.
.PHONY: clean
clean:
	rm -rf public public-* resources

#----------------------------------------------------------------------------------
# Framework tests (docs-theme-extras Playwright HTML harness)
#
# The harness lives in solo-io/docs-theme-extras and runs against agr's built
# public/ via .docs-test.toml (DOCS_TEST_CONFIG). Pattern A: drive it from a
# sibling clone. Targets are prefixed `framework-test-*` so they don't collide
# with any future `test-*` doc-test namespace.
#
# One-time:  git clone https://github.com/solo-io/docs-theme-extras ../docs-theme-extras
#            make framework-test-install
#----------------------------------------------------------------------------------

# Path to a docs-theme-extras checkout that hosts the harness. CI sets this
# inside $GITHUB_WORKSPACE; locally it defaults to a sibling clone.
# Override with: make framework-test FRAMEWORK_EXTRAS_DIR=/abs/path
FRAMEWORK_EXTRAS_DIR ?= ../docs-theme-extras

# One-time install: npm packages + Playwright browser binaries in the harness
# checkout. ~120-180 MB, ~1-3 minutes.
.PHONY: framework-test-install
framework-test-install:
	@if [ ! -d "$(FRAMEWORK_EXTRAS_DIR)" ]; then \
		echo "docs-theme-extras checkout not found at $(FRAMEWORK_EXTRAS_DIR)." >&2; \
		echo "Clone it as a sibling, or set FRAMEWORK_EXTRAS_DIR=/path/to/docs-theme-extras." >&2; \
		exit 1; \
	fi
	cd $(FRAMEWORK_EXTRAS_DIR) && npm install
	cd $(FRAMEWORK_EXTRAS_DIR) && npx playwright install --with-deps chromium firefox webkit

# Build the site and run the full framework suite (static + browser). Opens the
# HTML report afterward.
.PHONY: framework-test
framework-test:
	@$(MAKE) _framework_test_preflight
	rm -rf public
	hugo160 --gc --minify > .build.log 2>&1
	cd $(FRAMEWORK_EXTRAS_DIR) && \
		(DOCS_TEST_CONFIG=$(abspath ./.docs-test.toml) npx playwright test; \
		result=$$?; npx playwright show-report; exit $$result)

# Fastest loop — static specs only, no browser launch.
.PHONY: framework-test-static
framework-test-static:
	@$(MAKE) _framework_test_preflight
	rm -rf public
	hugo160 --gc --minify > .build.log 2>&1
	cd $(FRAMEWORK_EXTRAS_DIR) && \
		(DOCS_TEST_CONFIG=$(abspath ./.docs-test.toml) npx playwright test --project=static; \
		result=$$?; npx playwright show-report; exit $$result)

# Chromium browser specs (tabs, mermaid, theme toggle, copy-md, console errors,
# viewport, contrast).
.PHONY: framework-test-browser
framework-test-browser:
	@$(MAKE) _framework_test_preflight
	rm -rf public
	hugo160 --gc --minify > .build.log 2>&1
	cd $(FRAMEWORK_EXTRAS_DIR) && \
		(DOCS_TEST_CONFIG=$(abspath ./.docs-test.toml) npx playwright test --project=browser; \
		result=$$?; npx playwright show-report; exit $$result)

# Cross-browser desktop specs across chromium, firefox, and webkit.
.PHONY: framework-test-cross-browser
framework-test-cross-browser:
	@$(MAKE) _framework_test_preflight
	rm -rf public
	hugo160 --gc --minify > .build.log 2>&1
	cd $(FRAMEWORK_EXTRAS_DIR) && \
		(DOCS_TEST_CONFIG=$(abspath ./.docs-test.toml) npx playwright test \
			--project=cross-browser-chromium \
			--project=cross-browser-firefox \
			--project=cross-browser-webkit; \
		result=$$?; npx playwright show-report; exit $$result)

# Open the most recent Playwright HTML report.
.PHONY: framework-test-report
framework-test-report:
	@if [ ! -d "$(FRAMEWORK_EXTRAS_DIR)" ]; then \
		echo "docs-theme-extras checkout not found at $(FRAMEWORK_EXTRAS_DIR)." >&2; \
		exit 1; \
	fi
	cd $(FRAMEWORK_EXTRAS_DIR) && npx playwright show-report

# Shared preflight for the framework-test-* targets.
.PHONY: _framework_test_preflight
_framework_test_preflight:
	@if [ ! -d "$(FRAMEWORK_EXTRAS_DIR)" ]; then \
		echo "docs-theme-extras checkout not found at $(FRAMEWORK_EXTRAS_DIR)." >&2; \
		echo "Clone it as a sibling, or set FRAMEWORK_EXTRAS_DIR=/path/to/docs-theme-extras." >&2; \
		exit 1; \
	fi
	@if [ ! -d "$(FRAMEWORK_EXTRAS_DIR)/node_modules" ]; then \
		echo "Run 'make framework-test-install' first." >&2; exit 1; \
	fi
