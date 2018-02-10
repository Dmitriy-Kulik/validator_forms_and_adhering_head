$(window).scroll(function () {
    var h = $('.header');
/*    console.log("scrollTop " + $(this).scrollTop());
    console.log("offset " + h.offset().top);*/
    if ($(this).scrollTop() > h.offset().top) {
        h.css("position", "fixed");
        h.css("top", "0px");
    } else if(h.offset().top <= 300){
        h.css("position", "absolute");
        h.css("top", "300px");
    }
});

function serializeObject($form) {
    var obj = {};
    var arr = $form.serializeArray();
    $.each(arr, function() {
        if (obj[this.name]) {
            if (!obj[this.name].push) {
                obj[this.name] = [obj[this.name]];
            }
            obj[this.name].push(this.value || '');
        } else {
            obj[this.name] = this.value || '';
        }
    });
    return obj;
}

function list_errors() {
    var rules = {
        min_length_name: 4,
        min_length_pass: 4,
        is_empty: "Поле обязательно к заполнению",
        name: {
            required: "Поле 'Логин' обязательно к заполнению",
            min_length: "Введите не менее 4-х символов в поле 'Логин'"
        },
        pass: {
            required: "Поле 'Пароль' обязательно к заполнению",
            min_length: "Введите не менее 6 символов в поле 'Пароль'"
        },
        mail: {
            required: "Поле 'Email' обязательно к заполнению",
            email: "Необходим формат адреса email"
        }
    }
    return rules;
}

function name (str) {
/*  Имя пользователя (с ограничением 2-20 символов,
    которыми могут быть буквы и цифры, первый символ обязательно буква):*/
    var t = /^[a-zA-Z][a-zA-Z0-9-_\.]{5,20}$/.test(str);
    return !(t);
}
function pass (str) {
/*  Пароль (Строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов):*/
    var n = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(str);
    return !(n);
}
function mail (str) {
/*  UPD. E-mail (от kvf77):*/
    var m = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(str);
    return !(m);
}
function name_length(str) {
    return  (str.length < 5) ? true : false;
}

$('input[type="checkbox"]').change(function(event) {
    if($(".ck_pass").is(":checked")) {
        $('form').find('input' + '[name=pass]').attr('type', 'text');
        console.log(event);
    } else {
        $('form').find('input' + '[name=pass]').attr('type', 'password');
    }
});

$('form').submit(function (e) {
    e.preventDefault();

    var form = $(this);
    var arr_data = form.serializeArray();

    var inputs = $(this).find('input');
    var errors = [];

    arr_data.forEach(function (el, i) {
        if(arr_data[i]['name'] == 'login') {
            /*console.log(arr_data[i]['value'] + ' isEmpty');
            console.log(name_length(arr_data[i]['value']) + ' login_length');
            console.log(name(arr_data[i]['value']) + ' name_regul');
            console.log(pass(arr_data[i]['value']) + ' pass_regul');
            console.log(mail(arr_data[i]['value']) + ' mail_regul');*/

            $( ".er_name" ).text(function (i, str) {
                var str = list_errors().name.required;
                return str;
            }).show().fadeOut( 3000 );

            if (arr_data[i]['value'] == '') {
                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-error");
                //$( ".er_name" ).text(list_errors().name.required).show().fadeOut( 3000 );
            }
            else if(name(arr_data[i]['value'])){
                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-error");
            }
            else {
                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-loading");
            }
        }
        if(arr_data[i]['name'] == 'pass') {
            if (arr_data[i]['value'] == ''){
                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-error");
            }
            else if(pass(arr_data[i]['value'])){
                console.log("+");
                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-error");
            }
            else {
                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-loading");
            }
        }
        if(arr_data[i]['name'] == 'mail') {
            if (arr_data[i]['value'] == ''){
                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-error");
            }
            else if(mail(arr_data[i]['value'])){
                console.log("+");
                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-error");
            }
            else {
                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-loading");
            }
        }
 /*       if(isEmpty(arr_data[i]['value'])){

            form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-error");
            return 0;
        } else{
            form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-loading");
        }

        if (arr_data[i]['name'] == 'login') {

            if (name_length(arr_data[i]['value']) && isEmpty(arr_data[i]['value'])) {
                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-error");
                return 0;

            } else {
                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-loading");

            }
        }

        if (arr_data[i]['name'] == 'login') {

            if (name(arr_data[i]['value']) && isEmpty(arr_data[i]['value'])) {
                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-error");

            } else {
                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-loading");

            }
        }

        if (arr_data[i]['name'] == 'pass') {

            if (pass(arr_data[i]['value']) && isEmpty(arr_data[i]['value'])) {

                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-error");

            } else {
                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-loading");

            }
        }

        if (arr_data[i]['name'] == 'mail') {

            if (mail(arr_data[i]['value']) && isEmpty(arr_data[i]['value'])) {

                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-error");
                //$(".e_n_text").text(validate().min_length);
            } else {
                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-loading");
                //$(".e_n_text").text("");
            }
        }*/
    });
});

        
        
        /*if(arr_data[i]['value'] == ''){
            form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-error");
        }
        if(arr_data[i]['value'] != '') {
            if(arr_data[0]['value'].length < 4){
                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-error");
                $( ".e_n_text").text(validate().messages.name.min_length);
            } else if(true){

            }
            else {
                form.find('input[name=' + arr_data[i]['name'] + ']').removeClass().attr("class", "is-loading");
                console.log(mail(arr_data[2]['value']));
            }*/

            /*} else {
                $( "span" ).text( "Not valid!" ).show().fadeOut( 1000 );
            }*/
        //}

    /*inputs.each(function (i, el) {
        //console.log(el);
        if (!$(el).val()) {
            errors.push($(el).attr("name"));
        }
    });
    //console.log(arr_data);
    console.log(errors);

    errors.forEach(function (inputName, i) {
        if(inputName == 'login'){
            form.find('input[name=' + inputName + ']').removeClass().attr("class", "is-error");
            console.log('error');
        } else if ($.inArray("login", errors) == false){
            form.find('input[name=' + inputName + ']').removeClass().attr("class", "is-loading");
            console.log('loading');
        }*/



        /*if(inputName == 'login' || inputName == 'pass' || inputName == 'mail'){
            form.find('input[name=' + inputName + ']').removeClass().attr("class", "is-error");
            console.log('error');


            /!*form.find('input[name=' + inputName + ']').addClass(function(i, old){
                console.log(old);
                form.removeClass(old);
                return 'is-error';
            });*!/
        } else if(!(inputName == 'login') || !(inputName == 'pass') || !(inputName == 'mail')) {
            form.find('input[name=' + inputName + ']').removeClass().attr("class", "is-loading");
            console.log('loading');
            /!*form.find('input[name=' + inputName + ']').addClass(function(i, old){
                $(this).removeClass(old);
                return 'is-loading';
            });*!/
        }*/
    //});

    /*if (errors.length) {
        errors.forEach(function (inputName, i) {
            form.find('input[name=' + inputName + ']').addClass(function(i, old){
                $(this).removeClass(old);
                return 'is-error';
            });
            console.log('this');
            /!*$('form').find('input[name=' + inputName + ']').addClass('is-error');*!/
            $( "span" ).text( "Not valid!" ).show().fadeOut( 1000 );
        });
    } else {
        //$('form').find('input').removeClass('is-error');
            form.find('input').addClass(function(i, old){
                $(this).removeClass(old);
                return 'is-loading';
            });
        //console.log("data: ", arr_data);
    }*/


/*
$('form').submit(function (e) {
    e.preventDefault();
   var form = $(this);
   var data = form.serialize();
   //'name=Andy&email=email@example.com'

   // validate
   var inputs = form.find('input');
   var errors = [];
   inputs.each(function (i, el) {
       if (!$(el).val()) {
           errors.push($(el).attr("name"));
       }
   });

   if (errors.length) {

       // error
       form.addClass('is-error');
       // or
       errors.forEach(function (inputName, i) {
           form.find('input[name='+inputName+']').addClass('is-error');
       });
   } else {

       // send
       form.addClass('is-loading');
       console.log("data: ", data);
   }
});*/
