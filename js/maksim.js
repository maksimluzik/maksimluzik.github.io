/**
 * Created by maksim on 02/12/15.
 */
// Define Mxmz object
var Mxmz = Mxmz || function () {
};

Mxmz.prototype.setActiveSection = function (section) {
    $('div#navigation li a[href="/#home"]').parent().removeClass('active');
    $('div#navigation li a[href="/#about"]').parent().removeClass('active');
    $('div#navigation li a[href="/#contact"]').parent().removeClass('active');
    $('div#navigation li a[href="/#social"]').parent().removeClass('active');
    console.log("setting section", section);
    switch (section) {
        case 'home':
            $('div#navigation li a[href="/#home"]').parent().addClass('active');
            break;
        case 'about':
            $('div#navigation li a[href="/#about"]').parent().addClass('active');
            break;
        case 'contact':
            $('div#navigation li a[href="/#contact"]').parent().addClass('active');
            break;
        case 'social':
            $('div#navigation li a[href="/#social"]').parent().addClass('active');
            break;
        default:
            break;
    }
};

Mxmz.prototype.updateCanvasSize = function () {
    var canvasContainerWidth = $('#canvas-panel-container').width();
    $('#myCanvas').css('width', canvasContainerWidth);
    console.log("updateCanvasSize", canvasContainerWidth);
};

// Create a Mxmz object
var Maksim = new Mxmz();

// Add waypoints for the hash link navigation
if (window.location.pathname == '/') {
    $('div#navigation li a[href="/#home"]').parent().addClass('active');

    $('section#home').waypoint(function (direction) {
        Maksim.setActiveSection('home');
    }, {offset: -10});
    $('section#about').waypoint(function (direction) {
        Maksim.setActiveSection('about');
    }, {offset: 50}).waypoint(function (direction) {
        Maksim.setActiveSection('about');
    }, {offset: 150});
    $('section#contact').waypoint(function (direction) {
        Maksim.setActiveSection('contact');
    }, {offset: 250});
    $('section#social').waypoint(function (direction) {
        Maksim.setActiveSection('social');
    }, {offset: 350});
}

$( document ).ready(function() {
    // Handler for .ready() called.
    Maksim.updateCanvasSize();
});

$( window ).resize(function() {
    Maksim.updateCanvasSize();
});

// Canvas initialization
$(document).ready(function () {
    if (!$('#myCanvas').tagcanvas({
            textColour: '#434f5b',
            outlineMethod: 'none',
            shadow: '#c0c0c0',
            shadowOffset: [1, 1],
            reverse: true,
            depth: 1.0,
            maxSpeed: 0.05,
            wheelZoom: false
        }, 'tags')) {
        // something went wrong, hide the canvas container
        $('#myCanvasContainer').hide();
    }
});