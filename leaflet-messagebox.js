// noinspection JSVoidFunctionReturnValueUsed
L.Control.Messagebox = L.Control.extend({
    options: {
        position: 'topright',
        timeout: 3000,
        cssClass: 'messagebox'
    },

    onAdd: function (map) {
        this._container = L.DomUtil.create('div', 'leaflet-control-messagebox');
        return this._container;
    },

    /**
     * Create a new message box
     * @param {string} message
     * @param {string|string[]}cssClass
     * @param {int|null|false} timeout
     * @param {boolean} show
     * @return {Messagebox}
     */
    new: function (message, cssClass, timeout, show = true) {
        let elem = this._container;
        this.timeout = timeout || this.options.timeout;
        elem.innerHTML = message;

        let finalCssClass = cssClass || this.options.cssClass;
        if (!Array.isArray(finalCssClass)) {
            finalCssClass = [finalCssClass]
        }
        elem.classList.add(...finalCssClass);
        if (show) {
            this.show()
        }
        return this
    },
    /**
     * Show the message box
     * @param {string} message
     * @param {int|null|false} timeout
     * @return {Messagebox}
     */
    show: function (message, timeout) {
        let _self = this
        let elem = this._container;
        if (typeof message !== 'undefined') {
            elem.innerHTML = message;
        }
        if (typeof timeout == 'undefined') {
            timeout = this.timeout
        }
        if (typeof this.timeoutID == 'number') {
            clearTimeout(this.timeoutID);
        }
        if (timeout !== false) {
            this.timeoutID = setTimeout(function () {
                _self.hide()
            }, timeout);
        }
        elem.style.display = 'block';
        return this
    },
    /**
     * Hide the message box
     * @return {Messagebox}
     */
    hide: function () {
        let elem = this._container;
        elem.style.display = 'none';
        return this
    },
    /**
     * Remove the message box
     */
    delete: function () {
        L.DomUtil.remove(this._container);
    }
});

L.Map.mergeOptions({
    messagebox: false
});

L.Map.addInitHook(function () {
    if (this.options.messagebox) {
        this.messagebox = new L.Control.Messagebox();
        this.addControl(this.messagebox);
    }
});

L.control.messagebox = function (options) {
    return new L.Control.Messagebox(options);
};
