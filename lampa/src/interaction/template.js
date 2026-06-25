/**
 * Система шаблонов для плагинов
 */

const Template = {
    templates: {},

    add(name, html) {
        this.templates[name] = html;
    },

    get(name, data = {}, returnHtml = false) {
        let template = this.templates[name] || '';
        
        Object.keys(data).forEach(key => {
            template = template.replace('{' + key + '}', data[key]);
        });

        if (returnHtml) {
            return template;
        }
        
        return template;
    },

    js(name) {
        let html = this.get(name);
        return $('<div>').html(html);
    }
};

export default Template;
