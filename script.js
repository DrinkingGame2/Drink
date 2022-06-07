var app = angular.module('clock', []);

app.filter('pad', function () {

});

app.filter('addSuffix', function () {

})

app.controller("ClockController", function ($scope, $timeout) {
    $scope.date = new Date();
    $scope.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    $scope.interval = null;
    $scope.spinUserTimeout = null;
    $scope.waitNewGameTimeout = null;
    $scope.tempImageName = "";
    $scope.duoPercentage = 0;

    $scope.noSleep = new NoSleep();
    $scope.maxRandomFileList = 5;
    $scope.currentRandomFileNumber = 1;

    $scope.maxRandomImage = 5;
    $scope.currentRandomImageNumber = 1;

    var audio = new Audio('Music/mexico.mp3');
    audio.loop = true;

    $scope.click = function () {
        document.body.requestFullscreen();
        screen.orientation.lock("landscape");
        $scope.noSleep.enable();
    }

    var tick = function () {
        $scope.date = new Date();
        $timeout(tick, 1000);
    };
    $timeout(tick, 1000);

    $scope.timetimer = 60;
    $scope.start = false;
    $scope.users = [
        { name: 'Lullijas', song: 'Music/lullijas.mp3', image: 'Images/lullijas.jpg' },
        { name: 'Kris Ken Erik Boel', song: 'Music/ken.mp3', image: 'Images/ken.jpg' },
        { name: 'Stoffel', song: 'Music/stoffel.mp3', image: 'Images/stoffel.jpg' },
        { name: 'SteefAn', song: 'Music/pulli.mp3', image: 'Images/pulli.jpg' },
        { name: 'Jenneman(Ron Wemel)', song: 'Music/bieber.mp3', image: 'Images/bieber.jpg' },
        { name: 'Nils', song: 'Music/nille.mp3', image: 'Images/nille.jpg' }

    ];
    $scope.drinks = [
        'MilkyMelky',
        'Wodki',
        'Beerru',

    ];
     $scope.colors = [
          'red',
         'blue',
         'yellow'

     ];
   // $scope.colors = [
   //     'yellow'
   // ];
    $scope.currentUser = null;
    $scope.currentDuaUser = null;
    $scope.currentDrink = '';
    

    $scope.add = function () {
        if ($scope.tempImageName != "") {

            $scope.users.push({ name: $scope.input, song: 'Music/random' + $scope.currentRandomFileNumber + '.mp3', image: $scope.tempImageName });
        } else {
            $scope.users.push({ name: $scope.input, song: 'Music/random' + $scope.currentRandomFileNumber + '.mp3', image: 'Images/random' + $scope.currentRandomImageNumber + '.jpg' });
        }

        if ($scope.currentRandomFileNumber == $scope.maxRandomFileList) {
            $scope.currentRandomFileNumber = 1;
        } else {
            $scope.currentRandomFileNumber++;
        }

        if ($scope.currentRandomImageNumber == $scope.maxRandomImage) {
            $scope.currentRandomImageNumber = 1;
        } else {
            $scope.currentRandomImageNumber++;
        }


        $scope.input = '';

        $scope.tempImageName = "";
    };

    $('#i_file').change(function (event) {
        $scope.tempImageName= URL.createObjectURL(event.target.files[0]);
       
    });

    $scope.remove = function (index) {
        $scope.users.splice(index, 1);
    };

    $scope.addDrinks = function () {
        $scope.drinks.push($scope.inputDrinks);
        $scope.inputDrinks = '';
    };

    $scope.removeDrinks = function (index) {
        $scope.drinks.splice(index, 1);
    };

    $scope.timoutItem = null;

    $scope.startGame = function () {
        $scope.start = true;
        const rndInt = $scope.randomNumber(1, $scope.timetimer * 60000);
        $scope.timoutItem = setTimeout($scope.spinUsers, rndInt);
        $scope.bgColor = 'black';
        $scope.$apply();
    }

    $scope.stopGame = function () {
        $scope.start = false;
        clearTimeout($scope.timoutItem);
        clearTimeout($scope.spinUserTimeout);
        clearTimeout($scope.waitNewGameTimeout);
        clearInterval($scope.interval);
        $scope.bgColor = 'white';
        $scope.stopMusic();
    }

    $scope.restartGame = function () {
        $scope.stopGame();
        $scope.startGame();
    }



    $scope.spinUsers = function () {
        audio = new Audio('Music/mexico.mp3');
        audio.play();

        $scope.interval = setInterval(function () {
            $scope.currentDuaUser = null;


            if (Math.random() < ($scope.duoPercentage / 100)) {
                $scope.currentDuaUser = $scope.users[$scope.randomNumber(0, $scope.users.length - 1)];
            }


            do {
                $scope.currentUser = $scope.users[$scope.randomNumber(0, $scope.users.length - 1)];
            } while ($scope.currentUser == $scope.currentDuaUser);

            $scope.currentDrink = $scope.drinks[$scope.randomNumber(0, $scope.drinks.length - 1)];
            $scope.bgColor = $scope.colors[$scope.randomNumber(0, $scope.colors.length - 1)];
            $scope.$apply();
        }, 100);
        $scope.spinUserTimeout = setTimeout($scope.stopInterval, 15000);

    }

    $scope.stopInterval = function () {
        clearTimeout($scope.spinUserTimeout);
        clearInterval($scope.interval);
        $scope.stopMusic();
        $scope.startUserMusic($scope.currentUser.song);


        $scope.waitNewGameTimeout = setTimeout($scope.restartGame, 15000);

    }

    $scope.stopMusic = function () {
        audio.pause();
        audio.currentTime = 0;

    }

    $scope.startUserMusic = function (song) {
        if (song != undefined) {
            audio = new Audio(song);
        } else {

            audio = new Audio('Music/random' + $scope.randomNumber(1, 3) + '.mp3');
        }

        audio.play();

    }

    $scope.randomNumber = function (min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

});
