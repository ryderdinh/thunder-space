/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "HRM - Zelios Sea",
  tagline: "Welcome to documentation HRM - Zelios Sea",
  url: "https://zelios-sea.netlify.app",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "dinhquanganh", // Usually your GitHub org/user name.
  projectName: "HRM_ZeliosSea", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "HRM - Zelios Sea",
      logo: {
        alt: "logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Documentation",
        },
        { to: "/blog", label: "Blog", position: "left" },
        // { to: "/developer", label: "Developer", position: "left" },
        {
          href: "https://github.com/dinhquanganh/HRM_ZeliosSea",
          label: "GitHub",
          position: "right",
        },
        {
          type: "localeDropdown",
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Documentation",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/dinhquanganh/HRM_ZeliosSea",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} HRM - Zelios Sea, Inc. Built with ZS Team.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  // i18n: {
  //   defaultLocale: "vi",
  //   locales: ["vi", "en"],
  // },
};
