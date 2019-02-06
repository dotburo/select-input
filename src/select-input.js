const
    d = document,
    defaults = {
        items: [],
        current: null,
        parent: null,
        maxHeight: 0,
        proposal: 'Add {X} to the list?',
        sort: true,
        order: 'desc',
        removalIcon: '&times;'
    };

export default class {
    constructor(element, options = {}) {
        this.options = Object.assign({}, defaults, options);

        this.dom = {
            el: this._setElement(element)
        };

        this.options.items = this._convertItems(options.items);
        this.current = options.current ? this._convertItem(options.current) : {};

        // search result caching
        this.__found = null;

        if (this.options.sort) this._sortItems();

        this._renderInit();

        this._events = [];
        this._bindEvents();
    }

    /**
     * Bind the (delegated) dom events
     * @private
     */
    _bindEvents() {
        let closeOnEvent = e => {
            if ((e.key === 'Escape' || e.keyCode === 27) ||e.target.contains(this.dom.el)) {
                this.toggle(false)
            }
        };

        this.on('input', this._search);
        this.on('click', this._handleClick);
        this.on('keyup', this._handleKey);
        this.on('focusin', () => (this._renderListItems().toggle(true)), this.dom.input);

        // close the list on `Escape` or on a click outside the component
        this.on('keyup', closeOnEvent, d);
        this.on('click', closeOnEvent, d);
    }

    /**
     * Bind a delegated event
     * @param {String} event
     * @param {Function} fn
     * @param {HTMLElement|Document} el
     */
    on(event, fn, el = null) {
        fn = fn.bind(this);
        (el || this.dom.el).addEventListener(event, fn, false);
        this._events.push({
            name: event,
            fn: fn,
            el: el
        })
    }

    /**
     * Show/hide the dropdown
     * @param {Boolean} show
     */
    toggle(show = false) {
        this.dom.el.firstElementChild.classList[show ? 'remove' : 'add']('si-hide');
        if (!show) this.dom.input.blur();
    }

    /**
     * Return the main wrapping element
     * @return {Element}
     */
    getElement() {
        return this.dom.el;
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
     * @return {{}|null}
     */
    getCurrent() {
        let current = Object.assign({}, this.current);
        delete current._lc;
        return current;
    }

    /**
     * Find an item in the list
     * @param {HTMLElement|String|Number} value
     * @return {{}}
     */
    findItem(value) {
        value = value.nodeName ? value.dataset.value : value;
        return this.options.items.find(item => item.value === value);
    }

    /**
     * Unbind all events and clear cached properties
     * @return void
     */
    remove() {
        this._events = this._events.filter(event => (event.el || this.dom.el).removeEventListener(event.name, event.fn, false));
        this.dom.el.parentNode.removeChild(this.dom.el);
        this.dom = null;
    }

    /**
     * Set the current value of the field
     * @param {HTMLElement|null} el
     * @param {Object} item
     * @return this
     * @private
     */
    _setCurrent(item, el = null) {
        this.current = item;
        this.dom.input.value = item.value.toString();
        this._setSelected(item, el);
        return this;
    }

    /**
     * Set the current value of the field
     * @private
     */
    _clearCurrent() {
        this.current = {};
        this.dom.input.value = '';
        this._clearSelected();
    }

    /**
     * Communicate changes
     * @param {String} name
     * @param {Object} item
     * @private
     */
    _trigger(name, item = null) {
        let event;

        if (typeof CustomEvent === 'function') {
            event = new CustomEvent(name, {
                detail: (item || this.current)
            });
        } else {
            event = d.createEvent('Event');
            event.initEvent(name, true, true);
        }

        this.dom.el.dispatchEvent(event);
    }

    /**
     * Query the element in the dom if its a string
     * @param {Element|String} el
     * @return {Element|null}
     * @private
     */
    _setElement(el) {
        if (!el && !el.nodeType && typeof el !== 'string') {
            throw new Error('Wrong element type provided!');
        }
        if (el.nodeType) return el;
        return (this.options.parent || d).querySelector(el);
    }

    /**
     * Updated selected item in the html list
     * @param {Object} item
     * @param {HTMLElement|null} el
     * @private
     */
    _setSelected(item, el = null) {
        this._clearSelected();
        el = el ? el : this.dom.list.querySelector(`li[data-value="${item.value}"]`);
        if (el) el.classList.add('si-current');
    }

    /**
     * Remove classname
     * @private
     */
    _clearSelected() {
        let current = this.dom.list.querySelector('.si-current');
        if (current) current.classList.remove('si-current');
    }

    /**
     * Make an array of object if needed
     * @param {Array} items
     * @return {Object[]}
     * @private
     */
    _convertItems(items = []) {
        return items.map(item => this._convertItem(item))
    }

    /**
     * Normalize an item to object
     * @param {{value: String|Number, _lc: string|String} item
     * @return {{value: String|Number, _lc: string}}
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

        this.dom.input = wrap.appendChild(this._renderInput());
        this.dom.list = wrap.appendChild(this._renderList()).firstChild;

        if (this.current.value) this.dom.input.value = this.current.value;

        return this.dom.el.appendChild(wrap);
    }

    /**
     * Create the input element
     * @return {HTMLInputElement}
     * @private
     */
    _renderInput() {
        let el = d.createElement('input');
        el.type = 'text';
        el.autocomplete = 'false';
        el.spellcheck = false;
        return el;
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
            button = this._createRemovalButton();

        items.forEach(item => {
            selected = current && item.value === current ? ' si-current' : '';
            list += `<li class="si-item${selected}" data-value="${item.value}">${item.value}${button}</li>`;
        });

        return list;
    }

    /**
     * Insert the set of li's in the DOM
     * @param html
     * @return this
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
            term = e.target.value,
            termLc = term.toLowerCase(),
            list = this.options.items.filter(item => {
                return item._lc.indexOf(termLc) !== -1;
            }),
            html = this._createListItems(list),
            first = list[0],
            len = list.length;

        if (len === 1 && first) {
            found = first;
        }

        if (!first || (len && termLc && termLc !== first._lc)) {
            html += this._proposeItem(term);
        }

        this.__found = found;
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
        return `<li class="si-item si-proposal" data-term="${term}">${proposal}</li>`
    }

    /**
     * Decide what to do when user clicks inside the component
     * @param {MouseEvent} e
     * @private
     */
    _handleClick(e) {
        let el = e.target;

        if (el.classList.contains('si-proposal')) {
            this._setCurrent(this._createItem(el), el).toggle();
            this._trigger('created');
            return;
        }

        if (el.classList.contains('si-item')) {
            this._setCurrent(this.findItem(el), el).toggle();
            this._trigger('selected');
            return;
        }

        if (el.classList.contains('si-removal')) {
            this._trigger('removed', this._sliceItem(el.parentNode));
        }
    }

    /**
     * Handle `Enter`
     * @param {KeyboardEvent} e
     * @private
     */
    _handleKey(e) {
        let value = e.target.value,
            event = 'selected';

        if (value && (e.keyCode === 13 || e.which === 13 || e.key === 'Enter')) {
            if (this.__found) {
                this._setCurrent(this.__found);
            } else {
                this._setCurrent(this._createItem(value));
                event = 'created';
            }
            this.toggle();
            this._trigger(event);
        }
    }

    /**
     * Insert a new item in the list
     * @param {String|HTMLElement|Number} el
     * @return {{value: String|Number, _lc: string}}
     * @private
     */
    _createItem(el) {
        let item = this._convertItem(el.nodeName ? el.dataset.term : el);
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
            if (a.value < b.value) return -order;
            if (a.value > b.value) return order;
            return 0;
        });
    }

    /**
     * Remove an item from the list
     * @param {HTMLElement|Node} el
     * @return {{value: String|Number, _lc: string}}
     * @private
     */
    _sliceItem(el) {
        let items = this.options.items,
            needle = el.dataset.value.toLowerCase(),
            current = this.current,
            item;
        this.dom.list.removeChild(el);
        item = items.splice(items.findIndex(item => item._lc === needle), 1).shift();
        if (current && item._lc === current._lc) this._clearCurrent();
        return item;
    }
}
