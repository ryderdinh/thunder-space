/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Home',
  tagline: 'Thunder Space',
  url: 'https://thunderspace.netlify.app/',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',
  favicon: 'img/favicon.ico',
  organizationName: 'ryderdinh', // Usually your GitHub org/user name.
  projectName: 'thunder-space', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Thunder Space',
      logo: {
        alt: 'logo',
        src: 'img/logo.svg'
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Documentation'
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/ryderdinh/thunder-space',
          label: 'GitHub',
          position: 'right'
        },
        {
          type: 'localeDropdown'
        }
      ]
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: '/docs/intro'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus'
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus'
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ryderdinh/thunder-space'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Thunder Space, Inc. Built with Thunder Team.`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
  // i18n: {
  //   defaultLocale: "vi",
  //   locales: ["vi", "en"],
  // },
}
