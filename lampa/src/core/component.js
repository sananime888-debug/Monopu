/**
 * Регистрация компонентов плагинов
 */

const Component = {
    components: {},

    add(name, component) {
        this.components[name] = component;
        console.log('Component registered:', name);
    },

    get(name) {
        return this.components[name];
    },

    exists(name) {
        return this.components[name] !== undefined;
    },

    list() {
        return Object.keys(this.components);
    }
};

export default Component;
