'use strict';
(function() {

    $(function(){

        /* Functions */
        function getCookie(cname) {
            var name = cname + '=';
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)===' ') {c = c.substring(1);}
                if (c.indexOf(name) === 0) {return c.substring(name.length,c.length);}
            }
            return '';
        }

        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = 'expires='+d.toUTCString();
            document.cookie = cname + '=' + cvalue + '; ' + expires;
        }

        (function(){
          function showPolicy(){
            $('.cookies').show();
          }
          if(parseInt(getCookie('wb_p')) !== 1){
            showPolicy();
            setCookie('wb_p', 1, 365);
            $('.cookies .close').click(function() {
              $('.cookies').fadeOut();
            })
          }
        })();

        // init material
        $.material.init();

        // Magnific popup-youtube Config
        $('.popup-youtube').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        // Form
        var welcomeForm = document.getElementById('register-form');
        if (welcomeForm) {
          if (welcomeForm.attachEvent) {
              welcomeForm.attachEvent('submit', processWelcomeForm);
          } else {
              welcomeForm.addEventListener('submit', processWelcomeForm);
          }
        }

        function processWelcomeForm(e) {
          if (e.preventDefault) e.preventDefault();

          try{
            var form = document.getElementById('register-form');
            var email = form.querySelector('#inputEmail').value;
            var policy = form.querySelector('#policy').checked;

            if(email && policy){
              form.querySelector('#inputEmail').style.borderColor = 'inherit';
              form.querySelector('#policy').style.borderColor = 'inherit';
              var data = {email:email};
              var leadFormButton = document.getElementById('lead-form-button');
              leadFormButton.style.display = 'none';
              var processing = document.getElementById('processing-form');
              processing.style.display = 'block';
              try{
                // SendMail
                sendEmail('c348a464-4240-4cf4-9c88-7b2c892070d7', data);

                // Track Event
                dataLayer.push({'event': 'lead_real'});

                processing.style.display = 'none';
                var success = document.getElementById('success-form');
                success.style.display = 'block';
              }
              catch(e){}
            }
            else {
              if (!email || email === '') {
                form.querySelector('#inputEmail').style.borderColor = 'red';
              }
              if (!policy) {
                form.querySelector('#policy').style.borderColor = 'red';
              }
            }
          } catch(e){}
          return false;
        }

       function sendEmail(id, data){
         var url = 'https://notifications.api.willysbrewing.com/mail/send';
         var q = new XMLHttpRequest();
         q.open('POST', url, true);
         q.setRequestHeader('Content-Type', 'application/json');
         q.onreadystatechange = function(){
           if(this.readyState === 4){
             if(this.status.toString()[0] == '2'){
               // ok
             }
             else if(this.status.toString()[0] == '4' || this.status.toString()[0] == '5'){
               // error
             }
             else{
               // foo
             }
           }
         };
         var payload = {
           'recipient': data.email,
           'subject': data.subject || '',
           'content': data.content || '',
           'template':{
             'id': id,
             'data':{
               'name': data.name || 'notset',
               'from': data.from || 'notset',
               'content': data.content || 'notset'
             }
           }
         };
         q.send(JSON.stringify(payload));
       }


        // Do not delay load of page with async functionality: Wait for window load
        window.addEventListener('load',function(){

            // init smooth links
            $('a.smooth').click(function(e) {
                e.preventDefault();
                var $link = $(this);
                var anchor = $link.attr('href');
                $('html, body').stop().animate({
                    scrollTop : $(anchor).offset().top
                }, 500);
                return false;
            });

        }); // End of window load

    }); // End of jQuery context

})(); // End of use strict
