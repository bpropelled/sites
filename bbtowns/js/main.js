(function($) {

    var c = console.log;
    // Trigger the second countdown timer
    var secondTimer = false,
        timerRow = $('#timerrow'),
        deadTimerRow = $('#timerdeadrow');

    deadTimerRow.hide();

    // table html
    var timerTable = '' +
        '<table class="table">' +
        '<thead>' +
        '<tr>' +
        '<th><span>%-d</span></th>' +
        '<th class="dots">:</th>' +
        '<th><span>%H</span></th>' +
        '<th class="dots">:</th>' +
        '<th><span>%M</span></th>' +
        '<th class="dots">:</th>' +
        '<th><span>%S</span></th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr>' +
        '<td><span class="small">days</span></td>' +
        '<td></td>' +
        '<td><span class="small">hr</span></td>' +
        '<td></td>' +
        '<td><span class="small">min</span></td>' +
        '<td></td>' +
        '<td><span class="small">sec</span></td>' +
        '</tr>' +
        '</tbody>' +
        '</table>'

    //Countdown Begin
    $('#getting-started').countdown('2017/3/28 10:16:00')


        .on('update.countdown', function(event) {
            var $this = $(this);
            //    var $form = $(#registerform);
            $this.html(event.strftime('' + timerTable))
        })
        .on('finish.countdown', function(event) {

            var $this = $(this);
            var $form = $('.formsection').show();
            timerRow.hide();
            secondTimer = true;
            //Second Timer
            if (secondTimer) {
                deadTimerRow.show();
                $('#getting-deadline').countdown('2017/03/28 10:16:15')
                    .on('update.countdown', function(e) {
                        var $that = $(this);
                        $that.html(e.strftime('' + timerTable))
                    })
                    .on('finish.countdown', function(e) {
                        var $this = $(this);
                        $('.formsection').hide();
                        $this.html('<h2 class="text-center">Registration is Now Closed</h2>' +
                            '<p class="text-center" style="padding: 15px">Visit <a href="http://www.granitehomes.ca">Granite Homes</a> to see more of our communities</p>');
                    });
            }
        });

    //Tilt
    $('#logo').tilt({
        glare: true,
        maxGlare: .5,
        scale: 1.2
    });

    /////////////////////////////////////////////////
    ////////////        FORM  //////////////////////
    //Realtor Switch
    //Check if Iphone
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        var rf = $('#_fid_29'); //change this

        rf.live('change', function(e) {
            e.preventDefault();

            if ($(this).val() == "Yes") {
                console.log('hesdsdsdsdy');
                $('#realtorfield').removeClass('hide');
            } else {
                $('#realtorfield').addClass('hide');
            }

        }); //end iphone check
        //Else on all devices
    } else {
        var rf = $('#_fid_29'); //change this
        rf.on('change', function(e) {
            e.preventDefault();

            if ($(this).val() == "Yes") {
                console.log('hesdsdsdsdy');
                $('#realtorfield').removeClass('hide');
            } else {
                $('#realtorfield').addClass('hide');
            }

        }); //end rn

    };
    // End the Reator Switch

    $("#registrationForm").submit(function(e) {
        //prevent the default submit behaviour
        e.preventDefault();
        //cache a false form valid as default is false until conditions are met
        var isFormValid = false;
        var $formsuccess = $('#formsuccess'),
            $formfail = $('#formfail'),
            $formload = $('#formloading');

        $formload.fadeIn('slow');

        //Check if Valid based on JS validation lib
        if (!$("#registrationForm").valid()) {
            //if not valid, return false
            isFormValid = false;
            $formload.fadeOut('slow');
            $formfail.fadeIn('slow');

        } else {
            //is valid? return true
            isFormValid = true;
            $formfail.fadeOut('slow');
        };

        //Don't submit unless the value is true
        //This is all just client side validation stuff, sever handles validation too
        if (isFormValid) {
            //cache the form and els
            var form = $("#registrationForm");
            //Serialize the Data
            var regForm = $("#registrationForm").serialize();
            // Do the Ajaxian thing
            $.ajax({
                type: "POST",
                url: "scripts/formProcess.php",
                data: regForm,
                cache: false,
                success: function(result) {
                    c(result)
                    $formload.fadeOut('slow');
                    form.fadeOut('slow');
                    $formsuccess.fadeIn('slow');

                },
                error: function(err) {
                    $formload.fadeOut('slow');
                    $formfail.fadeIn('slow');
                }

            }); // End AJAX

        } //End if form is valid
        return false;
    }); //end click
    /////////////////////////////////////////////////
    ////////////        FORM  //////////////////////
}(jQuery));