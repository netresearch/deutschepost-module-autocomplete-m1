"use-strict";

var CountrySelect = Class.create();

/**
 * Wrapper for country select in checkout
 * @type {{initialize: CountrySelect.initialize, listenOnChange: CountrySelect.listenOnChange}}
 */
CountrySelect.prototype = {

    /**
     * @param {HTMLElement} $form
     */
    initialize: function ($form) {
        this.countrySelect = $form.down('[name*="country_id"]');
        this.isGermany = true;
        if (this.countrySelect.value !== 'DE') {
            this.isGermany = false;
        }
    },

    /**
     * Callback is executed when country changes and get this.isGermany as param
     * @param callback
     */
    listenOnChange: function(callback) {
        this.countrySelect.observe('change', function(e){
            this.isGermany = (e.target.value === 'DE');
            callback(this.isGermany);
        }.bind(this));
    }
};
