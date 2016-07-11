app.factory('Charts', function() {
    return {
        // populatePercentages: function(charts) {
        //     for (var i = 0; i < charts.length; i++) {
        //         charts[i].percentage = 100 * charts[i].data/charts[i].total;
        //     }
        // },
        // getDataArray: function(chart) {
        //     return [chart.data, chart.total - chart.data];
        // },
        //used to dynamically resize the charts on the page
        innerCircleWidth: function() {
            return $('div.percent-circle').width();
        },
        // headerHeight: function() {
        //     return $('div.innerPercentage h2').height();
        // },
        resizeFunction: function() {
            // $('div.innerPercentage').css({'height': this.innerCircleWidth() + 'px'});
            // $('div.chart-title').css({'font-size': 0.25*this.innerCircleWidth() + 'px'});
            // $('div.chart-data').css({'font-size': 0.12*this.innerCircleWidth() + 'px'});
            $('div.percent').css({'font-size': 0.30*this.innerCircleWidth() + 'px'});
            // $('div.innerPercentage h2').css({'margin-top': -0.5*this.headerHeight() + 'px'});
            // this.populatePercentages(charts);
        }

        //Some standard formatting settings for all charts
        // options: {
        //     cutoutPercentage: 90,
        //     animateIn: {
        //         animateScale: true
        //     },
        //     legend: {
        //         display: false
        //     },
        //     tooltips: {
        //         enabled: false
        //     }
        // },
        // transparent: 'rgba(0, 0, 0, 0)',

        // createCharts: function(scope, charts) {
        //     for (var i = 0; i < charts.length; i++) {
        //         if ($('#' + charts[i].name).length) {
        //             scope.someChart = new Chart($('#' + charts[i].name), {
        //                 type: 'doughnut',
        //                 data: {
        //                     labels: ["", ""],
        //                     datasets: [{
        //                         data: this.getDataArray(charts[i]),
        //                         backgroundColor: [
        //                             charts[i].color,
        //                             this.transparent
        //                         ],
        //                         borderColor: [
        //                             charts[i].color,
        //                             this.transparent
        //                         ],
        //                         borderWidth: 0
        //                     }]
        //                 },
        //                 options: this.options
        //             });
        //         }
        //     }
        //     this.resizeFunction(charts);
        // }

    }; 
}); 


app.factory('Recipes', function($http) {
  return {
    getAll: function(total) {
      return $http.get('http://localhost:8080/trust/api/timeline/getRecipeByFarmIdAndProductionId/15/221/0/' + total);  //1. this returns promise
    }
  };
});


app.factory ('Icons', function(){
    var home = 'img/icons/';
    return {
        home: function(){
            return home;
        }, 
        menu: function(){
            return home + 'menu_icon.png';
        }

    };
});

app.factory('Images', function(Image) {
  /*
   * anything created will be stored in this cache object,
   * based on the arguments passed to `getObj`.
   * If you need multiple arguments, you could form them into a string,
   * and use that as the cache key
   * since there's only one argument here, I'll just use that
   */
  var cache = {};

    return {
        getAll: function(obj) {
            // console.log(cache);
          //if we haven't created an array with this argument before
          if (!cache[obj.id]) {
            //create one and store it in the cache with that argument as the key
            cache[obj.id] = [
              new Image('http://localhost:8080/trust/api/file/getImageWithFarm/' + obj.farmId + '/normal/' + obj.image, true),
              new Image('img/farm-logo.jpg', false)
            ];
          }
          //return the cached array
          return cache[obj.id];
        }
    };

});

app.service('Image', function(){
    var Image = function(image, active){
        this.image = image;
        this.active = active;
    };
    return Image;
});

app.service('Contacts', function(Contact){
    var contacts = [];

    // var contactPush = function(data, type){
    //     var content;
    //     if (type === 'address'){
    //         content = angular.fromJson(data.address).address;
    //     }else{
    //         content = data[type];
    //     }
    //     if (content){
    //         contacts.push(
    //             new Contact(type, iconhome + 'contact_' + type + '.png', content)
    //         );
    //     }
    // };

    var generate = function(data){
        contacts.push(new Contact(data,'website'));
        contacts.push(new Contact(data,'address'));
        contacts.push(new Contact(data,'email'));
        contacts.push(new Contact(data,'phone'));
        contacts.push(new Contact(data,'facebookPage'));

        contacts = contacts.filter(function(contact){
            return contact.valid === true;
        });

        // contactPush(data, 'website');
        // contactPush(data, 'address');
        // contactPush(data, 'email');
        // contactPush(data, 'phone');
        // contactPush(data, 'facebookPage');

    };

    return {
        all: function(data){
            if (contacts.length === 0){
                generate(data);
            }
            return contacts;
        }
    };
});

app.service('Contact', function(Icons){
    var iconhome = Icons.home();
    var Contact = function(data, type){
        var val;
        if (type === 'address'){
            // console.log(angular.fromJson(data.address));
            val = angular.fromJson(data.address).address;
        }else{
            val = data[type];
        }

        if (val){
            this.valid = true;
        } else {
            this.valid = false;
            return;
        }

        var link = '';
        if (type === 'facebookPage' || type === 'website' || type === 'email'){
            link = val;
        }

        this.link = link;

        this.type = type;
        this.img = iconhome + 'contact_' + type + '.png';
        this.value = val;

        // console.log(this);


    };
    return Contact;
});

app.factory('Social', function(Icons){
    var iconhome = Icons.home();
    var social = [
        {
            'name': 'facebook', 
            'icon': iconhome + 'social_facebook.png'
        }, 
        {
            'name': 'instagram', 
            'icon': iconhome + 'social_instagram.png'
        }, 
        {
            'name': 'twitter', 
            'icon': iconhome + 'social_twitter.png'
        },
        {
            'name': 'pinterest', 
            'icon': iconhome + 'social_pinterest.png'
        },
        {
            'name': 'reddit', 
            'icon': iconhome + 'social_reddit.png'
        },
        {
            'name': 'googleplus', 
            'icon': iconhome + 'social_googleplus.png'
        }
    ];
    return {
        all: function(){
            return social;
        }

    };
});
app.factory('Tiles', function(){
    var iconHome = 'img/icons/';
    var tiles = [{
        'state': 'profile',
        'color': 'light-green',
        'content': 'Azienda agricola',
        'link': 'profile',
        'image': iconHome + 'profile_icon.png',
        'valid': true
    },
    {
        'state': 'info',
        'color': 'yellow',
        'content': 'Informazioni prodotto',
        'link': 'info',
        'image': iconHome + 'info_icon.png',
        'valid': true
    },
    {
        'state': 'detail',
        'color': 'orange',
        'content': 'Dettagli prodotto',
        'link': 'detail',
        'image': iconHome + 'detail_icon.png',
        'valid': true
    },
    {
        'state': 'nutrition',
        'color': 'red',
        'content': 'Valori nutrizionali',
        'link': 'nutrition',
        'image': iconHome + 'nutrition_icon.png',
        'valid': true
    },
    {
        'state': 'co2impact',
        'color': 'brown',
        'content': 'Impatto CO2',
        'link': 'co2impact',
        'image': iconHome + 'co2impact_icon.png',
        'valid': true
    },
    {
        'state': 'ingredient',
        'color': 'purple',
        'content': 'Ingredienti particolari',
        'link': 'ingredient',
        'image': iconHome + 'ingredient_icon.png',
        'valid': true
    },
    {
        'state': 'water',
        'color': 'blue',
        'content': 'Utilizzo acqua',
        'link': 'water',
        'image': iconHome + 'water_icon.png',
        'valid': true
    },
    {
        'state': 'recipe',
        'color': 'dark-green',
        'content': 'Ricette',
        'link': 'recipe.list',
        'image': iconHome + 'recipe_icon.png',
        'valid': true
    }];

    var validTiles = tiles.filter(function(tile){
        return tile.valid === true;
    });

    return {
        all: function(){
            return tiles;
        },
        get: function(state){
            var array =  tiles.filter(function(tile){
                return tile.state === state;
            });
            return array[0];
        }, 
        getValid: function(){
            return validTiles;
        }    
    };
});

app.factory('TileClasses', function(){
    var tileclasses = [
        {'num': 2, 'classes':'col-xs-12 col-md-6 full'},
        {'num': 3, 'classes':'col-xs-12 col-md-4 full' },
        {'num': 4, 'classes':'col-xs-6 col-md-6'},
        {'num': 5, 'classes':'col-xs-6 col-md-4','first':'col-xs-12 col-md-4 full'},
        {'num': 6, 'classes':'col-xs-6 col-md-4' },
        {'num': 7, 'classes':'col-xs-6 col-md-3','first':'col-xs-12 col-md-3 full'},
        {'num': 8, 'classes':'col-xs-6 col-md-3'}
    ];
    return {
        get: function(num){
            var array =  tileclasses.filter(function(obj){
                return obj.num === num;
            });
            return array[0];
        }, 
    };
});



