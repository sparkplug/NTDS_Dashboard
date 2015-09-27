/*
 * Login
 */
if ($('.login-content')[0]) {
    //Add class to HTML. This is used to center align the logn box
    $('html').addClass('login-content');

    $('body').on('click', '.login-navigation > li', function(){
        var z = $(this).data('block');
        var t = $(this).closest('.lc-block');

        t.removeClass('toggled');

        setTimeout(function(){
            $(z).addClass('toggled');
        });

    })
}