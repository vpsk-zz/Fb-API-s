(function() {
    'use strict';

    angular
        .module('facebook')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log,$window) {

        $log.debug('runBlock end');
        window.fbAsyncInit = function() {
            FB.init({
                appId: '', // put your fb id here
                xfbml: true,
                version: 'v2.6',
                status: true,
                cookie: true,
                oauth: true
            });
        };
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return; }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

})();

