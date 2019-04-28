import DomHelper from "./dom-component.js";
import defaults from "./defaults.js";

const d = document;

export default class SelectInput extends DomHelper {
    constructor(element, options = {}) {
        super(element, options, defaults);

        this.options.items = this._convertItems(options.items);
        this.current = options.current ? this._convertItem(options.current) : {};

        // search result caching
        this.__found = null;

        if (this.options.sort) this._sortItems();

        this._renderInit();

        this._bindEvents();
    }

    /**
     * Bind all (delegated) DOM events
     * @private
     */
    _bindEvents() {
        let closeOnEvent = e => {
            if ((e.key === 'Escape' || e.keyCode === 27) || !this.dom.el.contains(e.target)) {
                this.toggle(false)
            }
        };

        this.on('input', this._search);
        this.on('click', this._handleClick);
        this.on('keyup', this._handleKey);
        this.on('focusin', () => (this._renderListItems().toggle(true)), this.dom.input);

        // Close the list on `Escape` or on a click outside the main element
        this.on('keyup', closeOnEvent, d);
        this.on('click', closeOnEvent, d);
    }

    /**
     * Store the deletion callback
     * @param {Function} fn
     * @return SelectInput
     */
    onDelete(fn) {
        this.options.onDelete = fn;
        return this;
    }

    /**
     * Store the creation callback
     * @param {Function} fn
     * @return SelectInput
     */
    onCreate(fn) {
        this.options.onCreate = fn;
        return this;
    }

    /**
     * Show/hide the dropdown
     * @param {Boolean} show
     * @return DomHelper
     */
    toggle(show = false) {
        this.dom.el.firstElementChild.classList[show ? 'remove' : 'add']('si-hide');
        if (!show) this.dom.input.blur();
        return this;
    }

    /**
     * Get all items in the list
     * @return {Object[]}
     */
    getItems() {
        return this.options.items;
    }

    /**
     * Return the current field value object
     * @return {{value: String|Number}|null}
     */
    getCurrent() {
        let current = Object.assign({}, this.current);
        delete current._lc;
        return current;
    }

    /**
     * Clear the current value
     * @return void
     * @private
     */
    clearCurrent() {
        this.current = {};
        this.dom.input.value = '';
        this._clearSelected();
    }

    /**
     * Find an item in the list
     * @param {EventTarget|HTMLElement|String|Number} value
     * @return {{}}
     */
    findItem(value) {
        value = value.nodeName ? value.dataset.value : value;
        return this.options.items.find(item => item.value === value);
    }

    /**
     * Set the current value by its string
     * @param {String|undefined} value
     * @return SelectInput
     */
    setCurrent(value) {
        this._setCurrent(value ? this.findItem(value) : null);
        return this;
    }

    /**
     * Set the current value of the field
     * @param {EventTarget|null} el
     * @param {Object|null} item
     * @return SelectInput
     * @private
     */
    _setCurrent(item, el = null) {
        this.current = item;
        this.dom.input.value = item ? item.value.toString() : '';
        if (item) {
            this._setSelected(item, el);
        } else {
            this._clearSelected();
        }
        return this;
    }

    /**
     * Updated selected item in the html list
     * @param {Object} item
     * @param {EventTarget|HTMLElement|null} el
     * @private
     */
    _setSelected(item, el = null) {
        this._clearSelected();
        el = el ? el : this.dom.list.querySelector(`li[data-value="${item.value}"]`);
        if (el) el.classList.add('si-current');
    }

    /**
     * Remove the classname of current `<li>`
     * @private
     */
    _clearSelected() {
        let current = this.dom.list.querySelector('.si-current');
        if (current) current.classList.remove('si-current');
    }

    /**
     * Make an array of objects
     * @param {Array} items
     * @return {Object[]}
     * @private
     */
    _convertItems(items = []) {
        return items.map(item => this._convertItem(item))
    }

    /**
     * Normalize an item as an usable object
     * @param {String|Number|{value: String|Number, _lc: String}} item
     * @return {{value: String|Number, _lc: String}}
     * @private
     */
    _convertItem(item) {
        item = typeof item !== 'object' ? {value: item} : item;
        item._lc = item.value.toString().toLowerCase();
        return item;
    }

    /**
     * Create the HTML upon instantiation
     * @return {Node}
     * @private
     */
    _renderInit() {
        let wrap = d.createElement('div');

        wrap.className = 'si-wrap si-hide';

        this.dom.input = wrap.appendChild(this._renderInput()).firstChild;
        this.dom.list = wrap.appendChild(this._renderList()).firstChild;

        if (this.current.value) this.dom.input.value = this.current.value;

        return this.dom.el.appendChild(wrap);
    }

    /**
     * Create the input element
     * @return {HTMLDivElement}
     * @private
     */
    _renderInput() {
        let wrap = d.createElement('div'),
            el = d.createElement('input');
        wrap.className = 'si-input';
        el.type = 'text';
        el.autocomplete = 'false';
        el.spellcheck = false;
        el.placeholder = this.options.placeHolder;
        wrap.appendChild(el);
        return wrap;
    }

    /**
     * Create the list element
     * @return {HTMLDivElement}
     * @private
     */
    _renderList() {
        let wrap = d.createElement('div'),
            el = d.createElement('ul'),
            maxHeight = this.options.maxHeight;

        wrap.className = 'si-list';
        if (maxHeight) wrap.style.maxHeight = maxHeight + 'px';
        wrap.appendChild(el);

        return wrap;
    }

    /**
     * Create the list items
     * @param {Object[]} items
     * @return {String}
     * @private
     */
    _createListItems(items = []) {
        let list = '',
            current = this.current.value,
            selected = '',
            button = this.options.allowRemove ? this._createRemovalButton() : '';

        items.forEach(item => {
            selected = current && item.value === current ? ' si-current' : '';
            list += `<li class="si-item${selected}" data-value="${item.value}">${item.value}${button}</li>`;
        });

        return list;
    }

    /**
     * Insert the set of li's in the DOM
     * @param html
     * @return SelectInput
     * @private
     */
    _renderListItems(html = '') {
        this.dom.list.innerHTML = html || this._createListItems(this.options.items);
        return this;
    }

    /**
     * Item removal button template
     * @return {String}
     * @private
     */
    _createRemovalButton() {
        return `<button type="button" class="si-removal">${this.options.removalIcon}</button>`;
    }

    /**
     * Search and update the list upon typing
     * @param {KeyboardEvent} e
     * @private
     */
    _search(e) {
        let found = null,
            options = this.options,
            term = e.target.value,
            termLc = term.toLowerCase(),
            list = options.items.filter(item => {
                return item._lc.indexOf(termLc) !== -1;
            }),
            html = list || options.allowAdd ? this._createListItems(list) : '',
            first = list[0],
            len = list.length;

        if (len === 1) {
            found = first;
        }

        if ((len === 0 || (term && termLc !== first._lc)) && options.allowAdd) {
            this.__found = found;
            html += this._proposeItem(term);
        }
        else if (len === 0 && !options.allowAdd) {
            html += this._notFoundItem(term);
        }

        this._renderListItems(html);
    }

    /**
     * Create the item creation list item
     * @param {String} term
     * @return {String}
     * @private
     */
    _proposeItem(term) {
        let proposal = this.options.proposal.replace('{X}', `<span>${term}</span>`);
        return `<li class="si-item si-append si-proposal" data-term="${term}">${proposal}</li>`
    }

    /**
     * Create a 'not found' message as a list item
     * @param {String} term
     * @return {String}
     * @private
     */
    _notFoundItem(term) {
        let txt = this.options.notFound.replace('{X}', `<span>${term}</span>`);
        return `<li class="si-item si-append si-not-found">${txt}</li>`
    }

    /**
     * Decide what to do when user clicks inside the component
     * @param {MouseEvent} e
     * @private
     */
    _handleClick(e) {
        let el = e.target,
            classList = el.classList;

        if (this.options.allowAdd && classList.contains('si-proposal')) {
            if (this._tryCreateItem(el.dataset.term)) {
                this.toggle()._trigger('created', this.current);
            }
            return;
        }

        if (classList.contains('si-item')) {
            this._setCurrent(this.findItem(el), el)
                .toggle()
                ._trigger('selected', this.current);
            return;
        }

        if (this.options.allowRemove && classList.contains('si-removal')) {
            el = el.parentNode;
            if (this._fireCallback('onDelete', this.findItem(el))) {
                this._trigger('removed', this._sliceItem(el));
            }
        }
    }

    /**
     * The `onCreate` and `onDelete` callbacks allow to prevent their respective actions
     * @param {String} name
     * @param {Object} item
     * @return {Boolean}
     * @private
     */
    _fireCallback(name, item) {
        if (typeof this.options[name] === 'function') {
            return this.options[name](item);
        }
        return true;
    }

    /**
     * Handle `Enter` when there is a value in the field
     * @param {KeyboardEvent} e
     * @private
     */
    _handleKey(e) {
        let value = e.target.value,
            item = this.__found,
            event;
        
        if (!!value && (e.keyCode !== 13 && e.key !== 'Enter')) {
            return;
        }

        if (!item && value && this.options.allowAdd) {
            event = this._tryCreateItem(value) ? 'created' : null;
        } else if (item) {
            event = 'selected';
            this._setCurrent(item);
        }

        if (event) this.toggle()._trigger(event, this.current);
    }

    /**
     * If the value doesn't exist and the callback returns true, create and set as current
     * @param value
     * @return {boolean}
     * @private
     */
    _tryCreateItem(value) {
        let item = this._convertItem(value.trim());
        if (!this.findItem(value) && this._fireCallback('onCreate', item)) {
            this._setCurrent(this._insertItem(item));
            return true;
        }
        return false;
    }

    /**
     * Insert a new item in the list
     * @param {{value: String|Number, _lc: String}} item
     * @return {{value: String|Number, _lc: String}}
     * @private
     */
    _insertItem(item) {
        this.options.items.push(item);
        if (this.options.sort) this._sortItems();
        return item;
    }

    /**
     * Rearrange the list
     * @private
     */
    _sortItems() {
        let order = this.options.order === 'desc' ? 1 : -1;
        this.options.items.sort((a, b) => {
            if (a._lc < b._lc) return -order;
            if (a._lc > b._lc) return order;
            return 0;
        });
    }

    /**
     * Remove an item from the list
     * @param {HTMLElement|Node} el
     * @return {{value: String|Number, _lc: String}}
     * @private
     */
    _sliceItem(el) {
        let items = this.options.items,
            needle = el.dataset.value.toLowerCase(),
            current = this.current,
            item;
        this.dom.list.removeChild(el);
        item = items.splice(items.findIndex(item => item._lc === needle), 1).shift();
        if (current && item._lc === current._lc) this.clearCurrent();
        return item;
    }
}
