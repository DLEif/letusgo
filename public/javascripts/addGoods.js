'use strict';

require.config({
    baseUrl: './',
    paths:{
        'jquery': './jquery/dist/jquery',
        'semantic': './semantic-ui/dist/semantic'
    }
});

require(['jquery', 'semantic'], function ($, semantic) {


    $(document).ready(function () {

        $(document).ready(function () {

            $('a#cancel').on('click', function () {

                $(this).attr('href', '/shopManagement');
            });
            $('a#save').on('click', function () {
                verifyInfo();
            });

            var unit = $('input#goodUnit').val();
            var price = $('input#goodPrice').val();
            var name = $('input#goodName').val();

            var isIntergrated = name && unit && price;

            if (!isIntergrated) {
                $('#emptyError').show();
            } else {

                priceIsNumber(name, unit, price);
            }

            function priceIsNumber(name, unit, price){

                var reg = /^\d+(\.\d+)?$/;

                var  priceIsNumber = reg.exec(price);

                if(!priceIsNumber){
                    $('#emptyError').show();
                }else{
                    saveNewGood(name, unit, price);
                }
            }

            function saveNewGood(){

                $.post('/api/goods', {name: name, unit: unit, price: price})
                    .success(function(){

                        $('#emptyError').hide();
                        $('a#save').attr('href', '/shopManagement');
                    });
            }


        });
    });
});

