<div align="center">
  <img src="static/img/agent-registry-logo.svg" alt="Agent Registry Logo" width="200"/>
  
  # agentregistry Website
  
  **From registry to runtime. Fast development, curated artifacts.**
</div>

---

## About

Website for the [agentregistry](https://github.com/agentregistry-dev/agentregistry) project, published at [aregistry.ai](https://aregistry.ai).

This website is built with [Hugo](https://gohugo.io/) using the [Hextra](https://imfing.github.io/hextra/) theme.

## 🚀 Quick Start

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (Extended version 0.112.0 or later)
- Git

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/agentregistry-dev/website.git
cd website
```

2. Install the npm and Hugo dependencies:
```bash
npm install
hugo mod get
```

3. Start the development server with one of these commands:

   | Command | Builds |
   |---|---|
   | `make serve` | The whole site, including drafts and future-dated pages. |
   | `make serve NO_SEARCH=1` | Same as `make serve`, without the search index. The search box does nothing, but the build is faster. |
   | `hugo serve` | The whole site, without drafts or future-dated pages. |

4. Open your browser and navigate to `http://localhost:1313`

The site will automatically reload when you make changes to the content.

### Building for Production

To build the static site for production:

```bash
hugo
```

The generated site will be in the `public/` directory.

## 📁 Project Structure

```
agentregistry/
├── content/          # Markdown content files
│   └── _index.md    # Homepage content
├── static/          # Static assets (images, fonts, etc.)
│   └── img/         # Images
├── assets/          # Assets that need processing
│   └── css/         # Custom CSS
├── layouts/         # Custom Hugo layouts
│   ├── shortcodes/  # Reusable Hugo shortcodes
│   └── partials/    # Partial templates
├── hugo.yaml        # Hugo configuration
└── README.md        # This file
```

## ✨ Features

- **Dark Theme**: Beautiful dark mode by default
- **Responsive Design**: Works on all devices
- **Fast Loading**: Static site generation for optimal performance
- **Custom Styling**: Tailored dark theme with accent colors
- **Interactive Elements**: Lightbox diagrams, video tutorials, and more

## 🤝 Contributing

We welcome contributions to improve the website! Whether it's fixing bugs, improving documentation, or adding new features, your help is appreciated.

### Making Changes

1. Edit content in the `content/` directory (Markdown files)
2. Modify styles in `assets/css/custom.css`
3. Update Hugo configuration in `hugo.yaml`

## 💬 Support

Need help? Have questions?

- 💬 Join our [Discord community](https://discord.gg/Af8bX99dbX)
- 🐛 Report bugs via GitHub Issues
- 📖 Read the [Hugo documentation](https://gohugo.io/documentation/)

## 📝 License

This website is part of the agentregistry project.

---

## 🔄 Migration Note

This website was previously built with Next.js. The original Next.js code has been preserved in the `nextjs-backup/` directory for reference.
