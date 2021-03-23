ymaps.ready(['AnimatedLine']).then(init);



function init(ymaps) {

    var myMap = new ymaps.Map('map', {
            center: [55.796127, 49.106405],
            zoom: 13,
            controls: []
        }),

        // При клике на метке будет открываться балун,
        // содержащий Яндекс.Панораму в текущей географической точке.
        myPlacemark1 = new ymaps.Placemark([55.783446, 49.117509], {//театр камала
            panoLayer: 'yandex#panorama'
        }, {
            preset: 'islands#nightIcon',
            openEmptyBalloon: true,
            balloonPanelMaxMapArea: 0
        }),

        myPlacemark2 = new ymaps.Placemark([55.794041, 49.121133], {//черное озеро
            // Для этой метки будем запрашивать наземную панораму.
            panoLayer: 'yandex#panorama'
        }, {
            preset: 'islands#nightIcon',
            openEmptyBalloon: true,
            balloonPanelMaxMapArea: 0
        });


    //---------------------------3------------------------

    myPlacemark3 = new ymaps.Placemark([55.795396, 49.124668], {//театро оперы и балета
        // Для этой метки будем запрашивать наземную панораму.
        panoLayer: 'yandex#panorama'
    }, {
        preset: 'islands#nightIcon',
        openEmptyBalloon: true,
        balloonPanelMaxMapArea: 0
    });


    //-----------------------4----------------

    myPlacemark4 = new ymaps.Placemark([55.796316, 49.108845], {//кремль
        // Для этой метки будем запрашивать наземную панораму.
        panoLayer: 'yandex#panorama'
    }, {
        preset: 'islands#nightIcon',
        openEmptyBalloon: true,
        balloonPanelMaxMapArea: 0
    });


    //-----------------------5---------------
    myPlacemark5 = new ymaps.Placemark([55.813136, 49.107613], {//чаша
        // Для этой метки будем запрашивать наземную панораму.
        panoLayer: 'yandex#panorama'
    }, {
        preset: 'islands#nightIcon',
        openEmptyBalloon: true,
        balloonPanelMaxMapArea: 0
    });



    //-----------------------6----------------

    myPlacemark6 = new ymaps.Placemark([55.821114, 49.095672], {//тандем
        // Для этой метки будем запрашивать наземную панораму.
        panoLayer: 'yandex#panorama'
    }, {
        preset: 'islands#nightIcon',
        openEmptyBalloon: true,
        balloonPanelMaxMapArea: 0
    });


//---------------------7----------------------------
    myPlacemark7 = new ymaps.Placemark([55.792134, 49.122126], {//kfu  ymaps.panorama.Player
        // Для этой метки будем запрашивать наземную панораму.
        panoLayer: 'yandex#panorama'   //        var player = new ymaps.panorama.Player('player', new Panorama())
    }, {
        preset: 'islands#nightIcon',
        openEmptyBalloon: true,
        balloonPanelMaxMapArea: 0
    });

    // Функция, устанавливающая для метки макет содержимого ее балуна.
    function setBalloonContentLayout (placemark, panorama) {
        // Создание макета содержимого балуна.
        var BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div id="panorama" style="width:256px;height:156px"></div>', {
                // Переопределяем функцию build, чтобы при формировании макета
                // создавать в нем плеер панорам.
                build: function () {
                    // Сначала вызываем метод build родительского класса.
                    BalloonContentLayout.superclass.build.call(this);
                    // Добавляем плеер панорам в содержимое балуна.
                    this._openPanorama();
                },
                // Аналогично переопределяем функцию clear, чтобы удалять
                // плеер панорам при удалении макета с карты.
                clear: function () {
                    this._destroyPanoramaPlayer();
                    BalloonContentLayout.superclass.clear.call(this);
                },
                // Добавление плеера панорам.
                _openPanorama: function () {
                    if (!this._panoramaPlayer) {
                        // Получаем контейнер, в котором будет размещаться наша панорама.
                        var el = this.getParentElement().querySelector('#panorama');
                        this._panoramaPlayer = new ymaps.panorama.Player(el, panorama, {
                            controls: ['panoramaName']
                        });
                    }
                },
                // Удаление плеера панорамы.
                _destroyPanoramaPlayer: function () {
                    if (this._panoramaPlayer) {
                        this._panoramaPlayer.destroy();
                        this._panoramaPlayer = null;
                    }
                }
            });
        // Устанавливаем созданный макет в опции метки.
        placemark.options.set('balloonContentLayout', BalloonContentLayout);
    }

    // В этой функции выполняем проверку на наличие панорамы в данной точке.
    // Если панорама нашлась, то устанавливаем для балуна макет с этой панорамой,
    // в противном случае задаем для балуна простое текстовое содержимое.
    function requestForPanorama (e) {
        var placemark = e.get('target'),
            // Координаты точки, для которой будем запрашивать панораму.
            coords = placemark.geometry.getCoordinates(),
            // Тип панорамы (воздушная или наземная).
            panoLayer = placemark.properties.get('panoLayer');

        placemark.properties.set('balloonContent', "Идет проверка на наличие панорамы...");

        // Запрашиваем объект панорамы.
        ymaps.panorama.locate(coords, {
            layer: panoLayer
        }).then(
            function (panoramas) {
                if (panoramas.length) {
                    // Устанавливаем для балуна макет, содержащий найденную панораму.
                    setBalloonContentLayout(placemark, panoramas[0]);
                } else {
                    // Если панорам не нашлось, задаем
                    // в содержимом балуна простой текст.
                    placemark.properties.set('balloonContent', "Для данной точки панорамы нет.");
                }
            },
            function (err) {
                placemark.properties.set('balloonContent',
                    "При попытке открыть панораму произошла ошибка: " + err.toString());
            }
        );
    }

    function requestForPanorama2 (e) {
        var placemark = e.get('target'),
            // Координаты точки, для которой будем запрашивать панораму.
            coords = placemark.geometry.getCoordinates(),
            // Тип панорамы (воздушная или наземная).
            panoLayer = placemark.properties.get('panoLayer');

        placemark.properties.set('balloonContent', "Идет проверка на наличие панорамы...");

        // Запрашиваем объект панорамы.
        ymaps.panorama.locate(coords, {
            layer: panoLayer
        }).then(
            function (panoramas) {
                if (panoramas.length) {
                    // Устанавливаем для балуна макет, содержащий найденную панораму.
                    setBalloonContentLayout(placemark, new Panorama());
                } else {
                    // Если панорам не нашлось, задаем
                    // в содержимом балуна простой текст.
                    placemark.properties.set('balloonContent', "Для данной точки панорамы нет.");
                }
            },
            function (err) {
                placemark.properties.set('balloonContent',
                    "При попытке открыть панораму произошла ошибка: " + err.toString());
            }
        );
    }

    // Слушаем на метках событие 'balloonopen': как только балун будет впервые открыт,
    // выполняем проверку на наличие панорамы в данной точке и в случае успеха создаем
    // макет с найденной панорамой.
    // Событие открытия балуна будем слушать только один раз.
    myPlacemark1.events.once('balloonopen', requestForPanorama);
    myPlacemark2.events.once('balloonopen', requestForPanorama);
    myPlacemark3.events.once('balloonopen', requestForPanorama);
    myPlacemark4.events.once('balloonopen', requestForPanorama);
    myPlacemark5.events.once('balloonopen', requestForPanorama);
    myPlacemark6.events.once('balloonopen', requestForPanorama);
    myPlacemark7.events.once('balloonopen', requestForPanorama2);   //var player = new ymaps.panorama.Player('player', new Panorama())


    myMap.geoObjects.add(myPlacemark1);
    myMap.geoObjects.add(myPlacemark2);
    myMap.geoObjects.add(myPlacemark3);
    myMap.geoObjects.add(myPlacemark4);
    myMap.geoObjects.add(myPlacemark5);
    myMap.geoObjects.add(myPlacemark6);
    myMap.geoObjects.add(myPlacemark7);
    // Создаем карту.
   /* var myMap = new ymaps.Map("map", {
        center: [55.796127, 49.106405],
        zoom: 13
    }, {
        searchControlProvider: 'yandex#search'
    });
    // Создаем ломаные линии.*/

    var firstAnimatedLine = new ymaps.AnimatedLine([
        [55.783052, 49.117247],
        [55.783106, 49.117066],
        [55.783375, 49.117445],
        [55.783375, 49.117445],
        [55.784770, 49.119340],
        [55.785081, 49.118805],
        [55.786099, 49.120219],
        [55.786126, 49.120232],
        [55.786164, 49.120210],
        [55.786181, 49.120182],
        [55.786295, 49.120340],
        [55.786294, 49.120475],
        [55.786778, 49.121158],
        [55.787009, 49.121383],
        [55.788255, 49.123365],
        [55.788588, 49.123529],
        [55.788639, 49.123633],
        [55.788639, 49.123633],
        [55.788803, 49.123653],
        [55.789942, 49.124286],
        [55.792660, 49.124720],
        [55.793344, 49.123890],
        [55.793767, 49.121591],
        [55.793814, 49.121604],
        [55.793856, 49.121290],
        [55.794025, 49.121329],
        [55.794041, 49.121133],

    ], {}, {
        // Задаем цвет.
        strokeColor: "#EE1E26",
        // Задаем ширину линии.
        strokeWidth: 5,
        // Задаем длительность анимации.
        animationTime: 4000
    });
    var secondAnimatedLine = new ymaps.AnimatedLine([
        [55.794041, 49.121133],
        [55.793889, 49.120968],
        [55.793858, 49.121293],
        [55.793813, 49.121598],
        [55.793871, 49.121845],
        [55.794024, 49.122692],
        [55.794011, 49.122744],
        [55.794003, 49.122812],
        [55.794006, 49.122879],
        [55.794017, 49.122936],
        [55.794058, 49.123021],
        [55.794091, 49.123054],
        [55.794106, 49.123217],
        [55.794411, 49.123498],
        [55.794506, 49.123519],
        [55.794720, 49.123594],
        [55.794689, 49.123923],
        [55.794953, 49.124000],
        [55.794937, 49.124176],
        [55.795426, 49.124318],
        [55.795396, 49.124668],
    ], {}, {
        strokeColor: "#F7A91B",
        strokeWidth: 5,
        animationTime: 4000
    });


    //------------------3линия------------------
    var thirdAnimatedLine = new ymaps.AnimatedLine([
        [55.795426, 49.124318],
        [55.795396, 49.124668],
        [55.796174, 49.124527],
        [55.796219, 49.124059],
        [55.796232, 49.123996],
        [55.796678, 49.119270],
        [55.796670, 49.119090],
        [55.796689, 49.119043],
        [55.797006, 49.115419],
        [55.797041, 49.115370],
        [55.797251, 49.113012],
        [55.797248, 49.112900],
        [55.797183, 49.112826],
        [55.797226, 49.112579],
        [55.795696, 49.111032],
        [55.795664, 49.111106],
        [55.795628, 49.111061],
        [55.796099, 49.109871],
        [55.795910, 49.109647],
        [55.795919, 49.109593],
        [55.795908, 49.109541],
        [55.795894, 49.109501],
        [55.795838, 49.109387],
        [55.796301, 49.108288],
        [55.796338, 49.108338],
        [55.796376, 49.108329],
        [55.796592, 49.108137],
    ], {}, {
        strokeColor: "#5D3197",
        strokeWidth: 5,
        animationTime: 4000
    });

    //-----------4линия-----------

    var fourthAnimatedLine = new ymaps.AnimatedLine([
        [55.796450, 49.108258],
        [55.796493, 49.108853],
        [55.796755, 49.109257],
        [55.796817, 49.109297],
        [55.797028, 49.109230],
        [55.797196, 49.109176],
        [55.797737, 49.108933],
        [55.797886, 49.108951],
        [55.798386, 49.109089],
        [55.798381, 49.109221],
        [55.798641, 49.109252],
        [55.798648, 49.109448],
        [55.798867, 49.109479],
        [55.798889, 49.109518],
        [55.798883, 49.109639],
        [55.799007, 49.109704],
        [55.799019, 49.109625],
        [55.799036, 49.109569],
        [55.799092, 49.109514],
        [55.801310, 49.107833],
        [55.801757, 49.107880],
        [55.801922, 49.107866],
        [55.802214, 49.107454],
        [55.802286, 49.107253],
        [55.802332, 49.107216],
        [55.802361, 49.106229],
        [55.802480, 49.106177],
        [55.801767, 49.103201],
        [55.801739, 49.102942],
        [55.801783, 49.102657],
        [55.801828, 49.102534],
        [55.801881, 49.102449],
        [55.801950, 49.102377],
        [55.802025, 49.102328],
        [55.803084, 49.101966],
        [55.803533, 49.101973],
        [55.804945, 49.102309],
        [55.811093, 49.103035],
        [55.811424, 49.103030],
        [55.811674, 49.102982],
        [55.811859, 49.102908],
        [55.812194, 49.103765],
        [55.812412, 49.104475],
        [55.812475, 49.104810],
        [55.812490, 49.105688],
        [55.812479, 49.105846],
        [55.812497, 49.106091],
        [55.812649, 49.106151],
        [55.812786, 49.106232],
        [55.812849, 49.106283],
        [55.812849, 49.107228],
        [55.812970, 49.107263],
        [55.813159, 49.107442],
        [55.813197, 49.107509],
        [55.813136, 49.107613],

    ], {}, {
        strokeColor: "#07A562",
        strokeWidth: 5,
        animationTime: 4000
    });

    //-----------5линия-----------
    var fifthAnimatedLine = new ymaps.AnimatedLine([

        [55.812849, 49.106283],
        [55.812849, 49.107228],
        [55.812970, 49.107263],
        [55.813159, 49.107442],
        [55.813197, 49.107509],
        [55.813136, 49.107613],
        [55.812847, 49.105994],
        [55.812829, 49.105978],
        [55.813678, 49.104724],
        [55.813826, 49.105039],
        [55.813979, 49.104816],
        [55.814026, 49.104911],
        [55.814070, 49.104947],
        [55.814164, 49.104930],
        [55.814207, 49.104906],
        [55.814426, 49.104721],
        [55.814512, 49.104718],
        [55.813849, 49.102395],
        [55.814071, 49.102151],
        [55.814094, 49.102099],
        [55.814104, 49.102039],
        [55.814100, 49.101966],
        [55.814007, 49.101452],
        [55.816182, 49.099941],
        [55.816239, 49.099862],
        [55.816289, 49.099774],
        [55.816312, 49.099754],
        [55.816480, 49.099711],
        [55.817772, 49.098820],
        [55.817827, 49.098807],
        [55.817886, 49.098844],
        [55.817983, 49.098503],
        [55.818035, 49.098494],
        [55.818239, 49.098345],
        [55.818683, 49.098356],
        [55.819445, 49.097821],
        [55.819459, 49.097678],
        [55.820010, 49.097399],
        [55.820025, 49.097506],
        [55.820117, 49.097459],
        [55.820170, 49.097409],
        [55.821528, 49.096808],
        [55.821502, 49.096394],
        [55.821346, 49.095247],

    ], {}, {
        strokeColor: "#0369B5",
        strokeWidth: 5,
        animationTime: 4000
    });

    // Добавляем линии на карту.
    myMap.geoObjects.add(firstAnimatedLine);
    myMap.geoObjects.add(secondAnimatedLine);
    myMap.geoObjects.add(thirdAnimatedLine);
    myMap.geoObjects.add(fourthAnimatedLine);
    myMap.geoObjects.add(fifthAnimatedLine);
    // Создаем метки.
    var firstPoint = new ymaps.Placemark([55.783052, 49.117247], {}, { //театр
        preset: 'islands#redCircleIcon'
    });


    var secondPoint = new ymaps.Placemark([55.794041, 49.121133], {}, {//чертное озеро
        preset: 'islands#blueCircleIcon'
    });
    var thirdPoint = new ymaps.Placemark([55.795396, 49.124668], {}, {//театр оперы и балета
       preset: 'islands#blackCircleIcon'
    });

    var fourthPoint = new ymaps.Placemark([55.796592, 49.108137], {}, {
        preset: 'islands#orangeCircleIcon'
    });

    var fifthPoint = new ymaps.Placemark([55.813136, 49.107613], {}, {
        preset: 'islands#redCircleIcon'
    });

    var sixthPoint = new ymaps.Placemark([55.821346, 49.095247], {}, {
        preset: 'islands#greenCircleIcon'
    });


    // Функция анимации пути.
    function playAnimation()
    {
        // Убираем вторую линию.
        secondAnimatedLine.reset();
        thirdAnimatedLine.reset();
        fourthAnimatedLine.reset();
        fifthAnimatedLine.reset();
        // Добавляем первую метку на карту.
        myMap.geoObjects.add(firstPoint);
        // Анимируем первую линию.
        firstAnimatedLine.animate()
            // После окончания анимации первой линии добавляем вторую метку на карту и анимируем вторую линию.

            .then(function()
            {
                myMap.geoObjects.add(secondPoint);
                return secondAnimatedLine.animate();
            })


            // После окончания анимации второй линии добавляем третью метку на карту.
            .then(function()
            {
                myMap.geoObjects.add(thirdPoint);
                return thirdAnimatedLine.animate();
            })


            .then(function()
            {
                myMap.geoObjects.add(fourthPoint);
                return fourthAnimatedLine.animate();
            })

            .then(function()
            {
                myMap.geoObjects.add(fifthPoint);
                return fifthAnimatedLine.animate();
            })

            .then(function() {
                myMap.geoObjects.add(sixthPoint);
                // Добавляем паузу после анимации.
                return ymaps.vow.delay(null, 2000);
            })


            // После паузы перезапускаем анимацию.
            .then(function()
            {
                // Удаляем метки с карты.
           /*     myMap.geoObjects.remove(firstPoint);
                myMap.geoObjects.remove(secondPoint);
                myMap.geoObjects.remove(thirdPoint);
                myMap.geoObjects.remove(fourthPoint);
                myMap.geoObjects.remove(fifthPoint);
                myMap.geoObjects.remove(sixthPoint);*/

                fifthAnimatedLine.reset();
                secondAnimatedLine.reset();
                thirdAnimatedLine.reset();
                fourthAnimatedLine.reset();
                fifthAnimatedLine.reset();

                // Перезапускаем анимацию.
                playAnimation();
            });
    }

    // Запускаем анимацию пути.
    playAnimation();



    //-------------------------------------------------------------------------------------------
    // Для начала проверим, поддерживает ли плеер браузер пользователя.
    if (!ymaps.panorama.isSupported()) {
        // Если нет, то ничего не будем делать.
        return;
    }

    // Сначала описываем уровни масштабирования панорамного изображения.
    // Для этого заводим класс, реализующий интерфейс IPanoramaTileLevel.
    // Параметрами конструктора будут шаблон URL тайлов и размер уровня.
    function TileLevel (urlTemplate, imageSize) {
        this._urlTemplate = urlTemplate;
        this._imageSize = imageSize;
    }

    ymaps.util.defineClass(TileLevel, {
        getTileUrl: function (x, y) {
            // Определяем URL тайла для переданных индексов.
            return this._urlTemplate.replace('%c', y + '-' + x);
        },

        getImageSize: function () {
            return this._imageSize;
        }
    });

    // Теперь описываем панораму.
    function Panorama () {
        ymaps.panorama.Base.call(this);
        // Наша панорама будет содержать два уровня масштабирования
        // панорамного изображения: низкого и высокого качества.
        this._tileLevels = [
            new TileLevel('tiles/lq/%c.jpg', [512, 256]),
            new TileLevel('tiles/hq/%c.jpg', [7168, 3584])
        ];
    }

    // Наследуем класс панорамы от ymaps.panorama.Base, который частично
    // реализует IPanoramaTileLevel за нас.
    ymaps.util.defineClass(Panorama, ymaps.panorama.Base, {
        getPosition: function () {
            // Панорама будет располагаться в начале координат...
            return [0, 0, 0];
        },

        getCoordSystem: function () {
            // ...декартовой системы.
            return ymaps.coordSystem.cartesian;
        },

        getAngularBBox: function () {
            // Область, которую занимает панорама на панорамной сфере.
            // В нашем случае это будет вся сфера.
            return [
                0.5 * Math.PI,
                2 * Math.PI,
                -0.5 * Math.PI,
                0
            ];
        },

        getTileSize: function () {
            // Размер тайлов, на которые нарезано изображение.
            return [512, 512];
        },

        getTileLevels: function () {
            return this._tileLevels;
        }
    });

    // Теперь создаем плеер с экземпляром нашей панорамы.
    //var player = new ymaps.panorama.Player('player', new Panorama());
}
