/**
 * Манифест приложения и плагинов
 */

const Manifest = {
    author: 'Lampa Team',
    version: '3.2.6',
    app_version: '3.2.6',
    css_version: '3.2.6',
    cub_domain: 'cub.rip',
    cub_site: 'cub.rip',
    github: 'https://github.com/yumata/lampa-source',
    plugins: [],

    get app_digital() {
        return parseInt(this.app_version.replace(/\./g, ''));
    },

    get css_digital() {
        return parseInt(this.css_version.replace(/\./g, ''));
    }
};

export default Manifest;
