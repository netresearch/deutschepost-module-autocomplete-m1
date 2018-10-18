"use strict";

var CountrySelect = Class.create();

/**
 * Wrapper for country selection in checkout.
 */
CountrySelect.prototype = {
    /**
     * @property {Boolean} isGermany
     */
    isGermany: false,

    /**
     * The HTML Element that is the source of the country selection.
     *
     * @property {HTMLElement} countrySelect
     */
    countrySelect: null,

    /**
     * Initialize.
     *
     * @param {HTMLElement} $form
     *
     * @constructor
     */
    initialize: function ($form) {
        this.countrySelect = $form.down('[name*="country_id"]');
        if (this.countrySelect.value === 'DE') {
            this.isGermany = true;
        }
    },

    /**
     * @param callback Is executed every time the address country changes.
     *                 Will recieve boolean this.isGermany as parameter.
     */
    listenOnChange: function(callback) {
        this.countrySelect.observe('change', function(e){
            this.isGermany = (e.target.value === 'DE');
            callback(this.isGermany);
        }.bind(this));
    }
};
