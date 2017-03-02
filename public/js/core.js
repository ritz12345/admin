/* =======================================================================
    HUTCHINSON SMART PLANT APPLICATION
========================================================================== */

/* =======================================================================
    ----------------------------------------------------------
    --                      CONTENTS                        --
    ----------------------------------------------------------
    HUTCHINSON[1] - ANGULAR DEFINITION

    HUTCHINSON[2] - APPLICATION DIRECTIVES

        HUTCHINSON[2.1] - PAGE ELEMENT CHANGING DIRECTIVES

            HUTCHINSON[2.1.1] - INDEX PAGE ELEMENTS
            HUTCHINSON[2.1.2] - ADMIN DASHBOARD PAGE ELEMENTS
            HUTCHINSON[2.1.3] - ADMIN SCHEDULE PAGE ELEMENTS
            HUTCHINSON[2.1.4] - ADMIN ADD USER PAGE ELEMENTS
            HUTCHINSON[2.1.5] - ADMIN USER ROLES PAGE ELEMENTS
            HUTCHINSON[2.1.6] - ADMIN PART MANAGEMENT PAGE ELEMENTS
            HUTCHINSON[2.1.7] - ADMIN CREATE PART PAGE ELEMENTS
            HUTCHINSON[2.1.8] - ADMIN PART RELATIONSHIP PAGE ELEMENTS
            HUTCHINSON[2.1.9] - ADMIN DELETE PART PAGE ELEMENTS
            HUTCHINSON[2.1.10] - ADMIN QUIZ MANAGEMENT PAGE ELEMENTS
            HUTCHINSON[2.1.11] - ADMIN CREATE QUIZ QUESTION PAGE ELEMENTS
            HUTCHINSON[2.1.12] - ADMIN DELETE QUIZ QUESTION PAGE ELEMENTS
            HUTCHINSON[2.1.13] - ADMIN QUALITY ALERTS PAGE ELEMENTS
            HUTCHINSON[2.1.14] - ADMIN CREATE QUALITY ALERT PAGE ELEMENTS
            HUTCHINSON[2.1.15] - ADMIN DELETE QUALITY ALERTS PAGE ELEMENTS
            HUTCHINSON[2.1.20] - VIEW PART HOURLY RATES

        HUTCHINSON[2.2] - OTHER DIRECTIVES

            HUTCHINSON[2.2.1] - ADD PART PAGE REQUIRED FIELDS
            HUTCHINSON[2.2.2] - SWITCH THROUGH DASHBOARD STATES
            HUTCHINSON[2.2.3] - UNUSED DIRECTIVES

    HUTCHINSON[3] - CONTROLLERS

        HUTCHINSON[3.1] - ADMIN CELL SCHEDULE CONTROLLER
        HUTCHINSON[3.2] - ADMIN ADD PART CONTROLLER
        HUTCHINSON[3.3] - ADMIN DELETE PART CONTROLLER
        HUTCHINSON[3.4] - ADMIN PART RELATIONSHIP CONTROLLER
        HUTCHINSON[3.7] - USER CONTROLLER
        HUTCHINSON[3.8] - QUIZ CONTROLLER
        HUTCHINSON[3.9] - TRAINING CONTROLLER
        HUTCHINSON[3.10] - DASHBOARD CONTROLLER
        HUTCHINSON[3.11] - ADMIN LOGIN CONTROLLER
        HUTCHINSON[3.12] - QUALITY ALERTS CONTROLLER
        HUTCHINSON[3.13] - WORK INSTRUCTIONS CONTROLLER
        HUTCHINSON[3.14] - PROCESS VERIFICATION CONTROLLER
        HUTCHINSON[3.15] - MAIN CONTROLLER


========================================================================== */

// prep global user
var authenticated_users = {
        admin    : false
    };
var admin_roles;

function notificationPopup() {
    $('#app-notifications').show().animate({opacity: "1"}, 1000, "linear", function() {
        setTimeout(function() {
            $('#app-notifications').animate({opacity: "0"}, 1000, "linear", function() {
                $('#app-notifications').hide();
            });
        }, 2000);
    });
}

var adminDashboardInterval;
var adminDashboardStatesInterval;
var adminDashboardInfoInterval;
var historianDataInterval;
var badgeSwipeInterval;
var plantOverviewInterval;
var editBadgeSwipeInterval;

/* =======================================================================
    HUTCHINSON[1] - ANGULAR DEFINITION
    - Define the Hutchinson App via Angular
    - Config the routes using ngRoute.
        - This allows switching between views on index.html
        - Define controllers for each page here as well
========================================================================== */
var hutchinsonApp = angular.module('hutchinsonApp', ['ngRoute', 'ui.bootstrap', 'angularFileUpload','oc.modal'])
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
          $routeProvider
            .when('/', {
              templateUrl: 'home.html',
              controller: 'adminLoginController'
            })
            .when('/index.html', {
              templateUrl: 'home.html',
              controller: 'adminLoginController'
            })
            .when('/admin/admin-startup.html', {
              templateUrl: 'admin-startup.html',
              controller: 'dashboardController'
            })
            .when('/admin/admin-dashboard.html', {
              templateUrl: 'admin-dashboard.html',
              controller: 'dashboardController'
            })
            .when('/admin/admin-schedule.html', {
              templateUrl: 'admin-schedule.html',
              controller: 'adminCellScheduleController'
            })
            .when('/admin/user-management.html', {
              templateUrl: 'user-management.html',
              controller: 'userController'
            })
            .when('/admin/add-user.html', {
              templateUrl: 'add-user.html',
              controller: 'userController'
            })
            .when('/admin/user-roles.html', {
              templateUrl: 'user-roles.html',
              controller: 'userController'
            })
            .when('/admin/part-management.html', {
              templateUrl: 'part-management.html',
              controller: 'mainController'
            })
            .when('/admin/create-part.html', {
              templateUrl: 'create-part.html',
              controller: 'adminAddPartController'
            })
            .when('/admin/part-relationship.html', {
              templateUrl: 'part-relationship.html',
              controller: 'adminPartRelationshipController'
            })
            .when('/admin/delete-part.html', {
              templateUrl: 'delete-part.html',
              controller: 'adminDeletePartController'
            })
            .when('/admin/edit-part.html', {
                templateUrl: 'edit-part.html',
                controller: 'adminEditPartController'
            })
            .when('/admin/quiz-management.html', {
              templateUrl: 'quiz-management.html',
              controller: 'mainController'
            })
            .when('/admin/create-quiz-question.html', {
              templateUrl: 'create-quiz-question.html',
              controller: 'adminQuizController'
            })
            .when('/admin/delete-quiz-question.html', {
              templateUrl: 'delete-quiz-question.html',
              controller: 'adminQuizController'
            })
            .when('/admin/quality-alerts.html', {
              templateUrl: 'quality-alerts.html',
              controller: 'mainController'
            })
            .when('/admin/create-quality-alert.html', {
              templateUrl: 'create-quality-alert.html',
              controller: 'adminQualityAlertsController'
            })
            .when('/admin/delete-quality-alert.html', {
              templateUrl: 'delete-quality-alert.html',
              controller: 'adminQualityAlertsController'
            })
            .when('/admin/box-schedule-complete.html', {
              templateUrl: 'box-schedule-complete.html',
              controller: 'adminCellScheduleController'
            })
            .when('/admin/create-work-instructions.html', {
              templateUrl: 'create-work-instructions.html',
              controller: 'workInstructionsController'
            })
            .when('/admin/work-instruction-management.html', {
              templateUrl: 'work-instruction-management.html',
              controller: 'mainController'
            })
            .when('/admin/process-verification-management.html', {
              templateUrl: 'process-verification-management.html',
              controller: 'mainController'
            })
            .when('/admin/create-process-verification.html', {
              templateUrl: 'create-process-verification.html',
              controller: 'techProcessVerificationController'
            })
            .when('/admin/operator-process-verification-management.html', {
              templateUrl: 'operator-process-verification-management.html',
              controller: 'mainController'
            })
            .when('/admin/create-operator-process-verification.html', {
              templateUrl: 'create-operator-process-verification.html',
              controller: 'operatorProcessVerificationController'
            })
            .when('/admin/historian-data.html', {
              templateUrl: 'historian-data.html',
              controller: 'historianDataController'
            })
            .when('/admin/boundary-sample-management.html', {
              templateUrl: 'boundary-sample-management.html',
              controller: 'mainController'
            })
            .when('/admin/manage-boundary-samples.html', {
              templateUrl: 'manage-boundary-samples.html',
              controller: 'boundarySamplesController'
            })
            .when('/admin/view-downtime-reasons.html', {
              templateUrl: 'view-downtime-reasons.html',
              controller: 'downtimeHistoryController'
            })
            .when('/admin/create-downtime-reasons.html', {
              templateUrl: 'create-downtime-reasons.html',
              controller: 'downtimeReasonsController'
            })
            .when('/admin/part-rate.html', {
              templateUrl: 'part-rate.html',      
              controller: 'adminPartHourlyRate'
            })
            .otherwise({
                templateUrl: 'home.html',
                controller: 'mainController'
            });

            $locationProvider.html5Mode(true);
        }
    ]);

/* =======================================================================
    HUTCHINSON[2] - APPLICATION DIRECTIVES
    - Directives allow us to create functions to be run when a view loads
    - They can be created using Attributes (A) or Elements (E).
    - Directive names seem to have to be all lower case in this version
      of Angular. Make sure the names are the same (case sensitive) on the
      view as well.
========================================================================== */

/* =======================================================================
    HUTCHINSON[2.1] - PAGE ELEMENT CHANGING DIRECTIVES
    - These directives switch out elements on the index page to match the
      layout of the design.
========================================================================== */

/* =======================================================================
    HUTCHINSON[2.1.1] - INDEX PAGE ELEMENTS
    - Only Content
========================================================================== */
hutchinsonApp.directive('indexpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            // Check if home.html is in view
            if ($('#page-id-index').length > 0) {
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').hide();
                $('#admin-navigation-single').hide();
                $('#trainer-navigation').hide();
                $('#page-header').hide();
                $('#main-page-header').hide();
                $('body').css('background-color', '#132057');

                $('.log-button > a').on('click', function() {
                    if ( authenticated_users.operator !== false )
                    {
                        authenticated_users.operator = false;
                    }
                });

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.2] - ADMIN DASHBOARD PAGE ELEMENTS
    - Main Page Header - User Dashboard Header Visible
    - Single Fixed Nav Bottom Visible
    - Content Visible (Dashboard)
========================================================================== */
hutchinsonApp.directive('admindashboardpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-admin-dashboard').length > 0) {
                $('body').css('background-color', '#090e24');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).text() == "Dashboard") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#trainer-navigation').hide();
                $('#page-header').hide();
                $('#main-page-header').show().addClass('user-dashboard');
                $('#main-page-header > .page-header').show();
                $('#main-page-header > .startup-section').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                // This function is responsible for controlling the value and dial position of the dashboard.
                //  - Can be changed to run however many seconds
                // =============================================================================
                adminDashboardInterval = setInterval(function() {
                    var pphValue = parseInt($("#pph-value").val());                             // Angular doesn't play nice with the gauge we are using,
                    var scrapValue = parseInt($("#scrap-value").val());                         // so get values from hidden input fields on the page.
                    var pphDialPosition = 30 + (300 * (pphValue / 100));                        // Calculate position (degrees) of the dials. Gauges have 300 degrees total
                    var scrapDialPosition = 30 + (300 * (scrapValue / 100));                    // so take the PPH/Scrap percentage and multiply by 300 (total) and add 30 (initial start point)
                    $(".pph-knob input.knob").val(pphValue).trigger("change");                  // Change value of the gauge and trigger it to change.
                    $(".scrap-knob input.knob").val(scrapValue).trigger("change");              // Change value of the gauge and trigger it to change.
                    $(".pph-knob .knob-dial").css({
                        "-ms-transform": "rotate("+pphDialPosition+"deg)",
                        "-webkit-transform": "rotate("+pphDialPosition+"deg)",
                        "transform": "rotate("+pphDialPosition+"deg)"
                    });                                                                         // Set the rotation of the gauge handle.
                    $(".scrap-knob .knob-dial").css({
                        "-ms-transform": "rotate("+scrapDialPosition+"deg)",
                        "-webkit-transform": "rotate("+scrapDialPosition+"deg)",
                        "transform": "rotate("+scrapDialPosition+"deg)"
                    });                                                                         // Set the rotation of the gauge handle.
                }, 350);
                $(".knob").knob();                                                              // Initialize the gauge.
                $(".pph-knob input.knob").css({"margin-top": "180px", "color": "#343434"});     // Position the text and change color.
                $(".scrap-knob input.knob").css({"margin-top": "180px", "color": "#343434"});   // Position the text and change color.
            }

            // Set image and name of logged in admin user.
            $('#page-header .user-logged-in .user-image img').attr('src', '..' + authenticated_users.admin.image_path).attr('alt', authenticated_users.admin.username);
            $('#page-header .user-information .user-name').text(authenticated_users.admin.username);
            $('#main-page-header .user-logged-in .user-image img').attr('src', '..' + authenticated_users.admin.image_path).attr('alt', authenticated_users.admin.username).show();
            $('#main-page-header .user-information .user-name').text(authenticated_users.admin.username);

            clearInterval(badgeSwipeInterval);
            clearInterval(historianDataInterval);
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.3] - ADMIN SCHEDULE PAGE ELEMENTS
    - Main Page Header Visible
    - Single Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('adminschedulepageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-admin-schedule').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Production") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Cell Schedule") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#admin-navigation-dual > ul > li > ul > li.menu-item-cell-schedule > ul > li').each(function() {
                    if ($(this).children('a').text() == "View") {
                        $(this).addClass('active');
                    }
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Cell Schedule');                     // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                setTimeout(function() {
                    $('#box-schedule > div').each(function() {
                        if ($(this).find('span:first').is(':empty')) {
                            $(this).find('a.adminAddComment').show();
                        }
                        else {
                            $(this).find('a.adminEditComment').show();
                        }
                    });

                    $('#cellSelect').find('option[value="5"]').attr('selected', 'selected');
                }, 300);

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.4] - ADMIN ADD USER PAGE ELEMENTS
    - Main Page Header Visible
    - Single Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('adduserpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-add-user').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Users") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li.menu-item-user-management > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Create") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Add User');                          // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});


/* =======================================================================
    HUTCHINSON[2.1.5] - ADMIN USER ROLES PAGE ELEMENTS
    - Main Page Header Visible
    - Single Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('userrolespageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-user-roles').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Users") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li.menu-item-user-management > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Edit") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('User Roles');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});


hutchinsonApp.directive('usermanagementpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#user-management-page-container').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Users") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Quiz Management');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.6] - ADMIN PART MANAGEMENT PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('partmanagementpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#part-management-page-container').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Parts") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });                                                                    // This function will remove any active class on a child nav item
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Part Management');                   // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.7] - ADMIN CREATE PART PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('createpartpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-create-part').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Parts") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li.menu-item-part-management > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Create") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all child navigation items and
                });                                                                           // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Create Part');                       // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.8] - ADMIN PART RELATIONSHIP PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('partrelationshippageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-part-relationship').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Parts") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li.menu-item-part-management > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Part Relationships") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all child navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Part Relationship');                 // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.9] - ADMIN DELETE PART PAGE ELEMENTS
    - Page Header Visible
    - Single Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('deletepartpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-delete-part').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Parts") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li.menu-item-part-management > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Delete") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all child navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Delete Part');                       // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.9] - ADMIN EDIT PART PAGE ELEMENTS
    - Page Header Visible
    - Single Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('editpartpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-edit-part').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Parts") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li.menu-item-part-management > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Edit") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all child navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Edit Part');                       // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.10] - ADMIN QUIZ MANAGEMENT PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('quizmanagementpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#quiz-management-page-container').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Production") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Quiz Management") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Quiz Management');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.11] - ADMIN CREATE QUIZ QUESTION PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('createquizquestionpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-create-quiz').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Production") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Quiz Management") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#admin-navigation-dual > ul > li > ul > li.menu-item-quiz-management > ul > li').each(function() {
                    if ($(this).children('a').text() == "Create") {
                        $(this).addClass('active');
                    }
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Quiz Management');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                $('#quizQuestionCategory').change(function() {
                    var categorySelected = $('#quizQuestionCategory').find(":selected").val();
                    if(categorySelected === "part-specific") {
                        $('#showQuizPart').show();
                        $('#showQuizCell').hide();
                    }
                    else if (categorySelected === "cell-safety") {
                        $('#showQuizPart').hide();
                        $('#showQuizCell').show();
                    }
                    else if (categorySelected === "part-cell-specific") {
                        $('#showQuizPart').show();
                        $('#showQuizCell').show();
                    }
                });

                $('#quizQuestionType').change(function() {
                    var typeSelected = $('#quizQuestionType').find(":selected").val();
                    if(typeSelected === "text") {
                        // $('#quizQuestionContainer').show();
                        $('#add-new-question-image').hide();
                    }
                    else if (typeSelected === "image") {
                        // $('#quizQuestionContainer').hide();
                        $('#add-new-question-image').show();
                    }
                });

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.12] - ADMIN DELETE QUIZ QUESTION PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('deletequizquestionpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-delete-quiz').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Production") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Quiz Management") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#admin-navigation-dual > ul > li > ul > li.menu-item-quiz-management > ul > li').each(function() {
                    if ($(this).children('a').text() == "Modify") {
                        $(this).addClass('active');
                    }
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Quiz Management');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                $('#search-field').on('keyup', function() {
                    $('.viewQuestionInfoButton').on('click', function(event) {
                        event.stopPropagation();
                        $(this).hide();
                        $(this).parent().children('.hideQuestionInfoButton').show();
                        $(this).parent().parent().children('.quizQuestionInfo').slideDown();
                    });

                    $('.hideQuestionInfoButton').on('click', function(event) {
                        event.stopPropagation();
                        $(this).hide();
                        $(this).parent().children('.viewQuestionInfoButton').show();
                        $(this).parent().parent().children('.quizQuestionInfo').slideUp();
                    });

                    $('.question_title_clickable').on('click', function() {
                        if ($(this).siblings('.viewQuestionInfoButton').is(':visible')) {
                            $(this).siblings('.viewQuestionInfoButton').hide();
                            $(this).siblings('.hideQuestionInfoButton').show();
                            $(this).parent().parent().children('.quizQuestionInfo').slideDown();
                        }
                        else {
                            $(this).siblings('.viewQuestionInfoButton').show();
                            $(this).siblings('.hideQuestionInfoButton').hide();
                            $(this).parent().parent().children('.quizQuestionInfo').slideUp();
                        }
                    });
                });

                setTimeout(function() {
                    $('.viewQuestionInfoButton').on('click', function(event) {
                        event.stopPropagation();
                        $(this).hide();
                        $(this).parent().children('.hideQuestionInfoButton').show();
                        $(this).parent().parent().children('.quizQuestionInfo').slideDown();
                    });

                    $('.hideQuestionInfoButton').on('click', function(event) {
                        event.stopPropagation();
                        $(this).hide();
                        $(this).parent().children('.viewQuestionInfoButton').show();
                        $(this).parent().parent().children('.quizQuestionInfo').slideUp();
                    });

                    $('.question_title_clickable').on('click', function() {
                        if ($(this).siblings('.viewQuestionInfoButton').is(':visible')) {
                            $(this).siblings('.viewQuestionInfoButton').hide();
                            $(this).siblings('.hideQuestionInfoButton').show();
                            $(this).parent().parent().children('.quizQuestionInfo').slideDown();
                        }
                        else {
                            $(this).siblings('.viewQuestionInfoButton').show();
                            $(this).siblings('.hideQuestionInfoButton').hide();
                            $(this).parent().parent().children('.quizQuestionInfo').slideUp();
                        }
                    });
                }, 250);

                $('#editQuizQuestionCategory').change(function() {
                    var categorySelected = $('#editQuizQuestionCategory').find(":selected").val();
                    if(categorySelected === "part-specific") {
                        $('#showQuizPart').show();
                        $('#showQuizCell').hide();
                    }
                    else if (categorySelected === "cell-safety") {
                        $('#showQuizPart').hide();
                        $('#showQuizCell').show();
                    }
                    else if (categorySelected === "part-cell-specific") {
                        $('#showQuizPart').show();
                        $('#showQuizCell').show();
                    }
                });

                $('#editQuizQuestionType').change(function() {
                    var typeSelected = $('#editQuizQuestionType').find(":selected").val();
                    if(typeSelected === "text") {
                        // $('#quizQuestionContainer').show();
                        $('#add-new-question-image').hide();
                    }
                    else if (typeSelected === "image") {
                        // $('#quizQuestionContainer').hide();
                        $('#add-new-question-image').show();
                    }
                });

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.13] - ADMIN QUALITY ALERTS PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('qualityalertspageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-quality-alerts').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Production") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Quality Alerts") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Quality Alerts');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.14] - ADMIN CREATE QUALITY ALERT PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('createqualityalertpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-create-quality-alert').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Production") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Quality Alerts") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#admin-navigation-dual > ul > li > ul > li.menu-item-quality-alerts > ul > li').each(function() {
                    if ($(this).children('a').text() == "Create") {
                        $(this).addClass('active');
                    }
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Quality Alerts');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.15] - ADMIN DELETE QUALITY ALERTS PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('deletequalityalertpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-delete-quality-alert').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Production") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Quality Alerts") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#admin-navigation-dual > ul > li > ul > li.menu-item-quality-alerts > ul > li').each(function() {
                    if ($(this).children('a').text() == "Modify") {
                        $(this).addClass('active');
                    }
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Quality Alerts');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.16] - BOX SCHEDULE COMPLETE PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('boxschedulecompletepageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-box-schedule-complete').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Production") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Cell Schedule") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#admin-navigation-dual > ul > li > ul > li.menu-item-cell-schedule > ul > li').each(function() {
                    if ($(this).children('a').text() == "Completed Orders") {
                        $(this).addClass('active');
                    }
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Completed Orders');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.17] - WORK INSTRUCTION MANAGEMENT PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('workinstructionmanagementpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-work-instruction-management').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Process") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Work Instructions") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Work Instruction Management');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});
/* =======================================================================
    HUTCHINSON[2.1.18] - CREATE WORK INSTRUCTIONS PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('createworkinstructionspageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-create-work-instructions').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Process") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Work Instructions") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#admin-navigation-dual > ul > li > ul > li.menu-item-work-instructions > ul > li').each(function() {
                    if ($(this).children('a').text() == "Modify") {
                        $(this).addClass('active');
                    }
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Create Work Instructions');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.17] - BOUNDARY SAMPLES MANAGEMENT PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('boundarysamplemanagementpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-boundary-sample-management').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Process") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Boundary Samples") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Boundary Sample Management');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});
/* =======================================================================
    HUTCHINSON[2.1.18] - MANAGE BOUNDARY SAMPLES PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('manageboundarysamplespageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-manage-boundary-samples').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Process") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Boundary Samples") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#admin-navigation-dual > ul > li > ul > li.menu-item-boundary-samples > ul > li').each(function() {
                    if ($(this).children('a').text() == "Modify") {
                        $(this).addClass('active');
                    }
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Manage Boundary Samples');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.19] - PROCESS VERIFICATION MANAGEMENT PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('processverificationmanagementpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-process-verification-management').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Process") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Tech Process Verification") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Tech Process Verification');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});
/* =======================================================================
    HUTCHINSON[2.1.18] - CREATE WORK INSTRUCTIONS PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('createprocessverificationpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-create-process-verification').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Process") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Tech Process Verification") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#admin-navigation-dual > ul > li > ul > li.menu-item-tech-process-verification > ul > li').each(function() {
                    if ($(this).children('a').text() == "Modify") {
                        $(this).addClass('active');
                    }
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Tech Process Verification');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});
/* =======================================================================
    HUTCHINSON[2.1.19] - PROCESS VERIFICATION MANAGEMENT PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('operatorprocessverificationmanagementpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-operator-process-verification-management').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Process") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Operator Process Verification") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Operator Process Verification');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});
/* =======================================================================
    HUTCHINSON[2.1.18] - CREATE WORK INSTRUCTIONS PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('createoperatorprocessverificationpageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-create-operator-process-verification').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Process") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Operator Process Verification") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#admin-navigation-dual > ul > li > ul > li.menu-item-operator-process-verification > ul > li').each(function() {
                    if ($(this).children('a').text() == "Modify") {
                        $(this).addClass('active');
                    }
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Operator Process Verification');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});
/* =======================================================================
    HUTCHINSON[2.1.19] - HISTORIAN DATA PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('historiandatapageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-historian-data').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Production") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Historian Data") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('View Historian Data');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.10] - VIEW DOWNTIME REASONS PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('viewdowntimereasonspageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-view-downtime-reasons').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Production") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Downtime Reasons") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#admin-navigation-dual > ul > li > ul > li.menu-item-downtime > ul > li').each(function() {
                    if ($(this).children('a').text() == "View") {
                        $(this).addClass('active');
                    }
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('View Downtime Reasons');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.1.10] - VIEW DOWNTIME REASONS PAGE ELEMENTS
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('createdowntimereasonspageelements', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-create-downtime-reasons').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Production") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Downtime Reasons") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#admin-navigation-dual > ul > li > ul > li.menu-item-downtime > ul > li').each(function() {
                    if ($(this).children('a').text() == "Modify") {
                        $(this).addClass('active');
                    }
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Create Downtime Reasons');                        // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
});


/* =======================================================================
    HUTCHINSON[2.1.20] - VIEW PART HOURLY RATES
    - Page Header Visible
    - Dual Fixed Nav Bottom Visible
    - Content Visible
========================================================================== */
hutchinsonApp.directive('parthourlyratelements', function(){
 return{
    restrict: 'A',
    link: function(scope, element, attrs){
      if ($('#page-id-part-hourly-rate').length > 0) {
          $('body').css('background-color', '#fff');
          $("body").hide();
          $("body").fadeIn(350);
          $('#admin-navigation-dual').show();
          $('#admin-navigation-dual > ul > li').each(function() {
              $(this).removeClass('active');
              if ($(this).children('a').text() == "Parts") {
                  $(this).addClass('active');
              }                                                                           // This function loops through all navigation items and
          });                                                                             // changes the active link to the current view.
          $('#admin-navigation-dual > ul > li > ul > li').each(function() {
              $(this).removeClass('active');
              if ($(this).children('a').text() == "Part Hourly Rate") {
                  $(this).addClass('active');
              }
          });
          $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
              $(this).removeClass('active');
          });
          $('#trainer-navigation').hide();
          $('#page-header').show();
          $('#page-header > .page-title > h2').text('Modify Hourly Rate');                        // Change the visible title of the page.
          $('#main-page-header').hide();

          $('.logo > a').attr("href", "admin-dashboard.html");

          clearInterval(adminDashboardInterval);
          clearInterval(adminDashboardStatesInterval);
          clearInterval(adminDashboardInfoInterval);
          clearInterval(badgeSwipeInterval);
          clearInterval(historianDataInterval);
          clearInterval(plantOverviewInterval);
      }
    }
  }


  /*
  return{
    restrict: 'A',
    link: function(scope, element, attrs){
      if ($('#page-id-part-hourly-rate').length > 0) {
          $('body').css('background-color', '#fff');
          $("body").hide();
          $("body").fadeIn(350);
          $('#admin-navigation-dual').show();
          $('#admin-navigation-dual > ul > li').each(function() {
              $(this).removeClass('active');
              if ($(this).children('a').text() == "Parts") {
                  $(this).addClass('active');
              }                                                                           // This function loops through all navigation items and
          });                                                                             // changes the active link to the current view.
          $('#admin-navigation-dual > ul > li > ul > li').each(function() {
              $(this).removeClass('active');
              if ($(this).children('a').text() == "Part Hourly Rate") {
                  $(this).addClass('active');
              }
          });
          $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
              $(this).removeClass('active');
          });
          $('#trainer-navigation').hide();
          $('#page-header').show();
          $('#page-header > .page-title > h2').text('Modify Hourly Rate');                        // Change the visible title of the page.
          $('#main-page-header').hide();

          $('.logo > a').attr("href", "admin-dashboard.html");

          clearInterval(adminDashboardInterval);
          clearInterval(adminDashboardStatesInterval);
          clearInterval(adminDashboardInfoInterval);
          clearInterval(badgeSwipeInterval);
          clearInterval(historianDataInterval);
          clearInterval(plantOverviewInterval);
      }
    }
  }
  */


  //Original
  /*
  return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if ($('#page-id-admin-schedule').length > 0) {
                $('body').css('background-color', '#fff');
                $("body").hide();
                $("body").fadeIn(350);
                $('#admin-navigation-dual').show();
                $('#admin-navigation-dual > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Production") {
                        $(this).addClass('active');
                    }                                                                           // This function loops through all navigation items and
                });                                                                             // changes the active link to the current view.
                $('#admin-navigation-dual > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                    if ($(this).children('a').text() == "Cell Schedule") {
                        $(this).addClass('active');
                    }
                });
                $('#admin-navigation-dual > ul > li > ul > li > ul > li').each(function() {
                    $(this).removeClass('active');
                });
                $('#admin-navigation-dual > ul > li > ul > li.menu-item-cell-schedule > ul > li').each(function() {
                    if ($(this).children('a').text() == "View") {
                        $(this).addClass('active');
                    }
                });
                $('#trainer-navigation').hide();
                $('#page-header').show();
                $('#page-header > .page-title > h2').text('Cell Schedule');                     // Change the visible title of the page.
                $('#main-page-header').hide();

                $('.logo > a').attr("href", "admin-dashboard.html");

                setTimeout(function() {
                    $('#box-schedule > div').each(function() {
                        if ($(this).find('span:first').is(':empty')) {
                            $(this).find('a.adminAddComment').show();
                        }
                        else {
                            $(this).find('a.adminEditComment').show();
                        }
                    });

                    $('#cellSelect').find('option[value="5"]').attr('selected', 'selected');
                }, 300);

                clearInterval(adminDashboardInterval);
                clearInterval(adminDashboardStatesInterval);
                clearInterval(adminDashboardInfoInterval);
                clearInterval(badgeSwipeInterval);
                clearInterval(historianDataInterval);
                clearInterval(plantOverviewInterval);
            }
        }
    };
    */
});




/* =======================================================================
    HUTCHINSON[2.2] - OTHER DIRECTIVES
========================================================================== */

/* =======================================================================
    HUTCHINSON[2.2.1] - ADD PART PAGE REQUIRED FIELDS
    - This function disables the submit button until all fields are inputted
========================================================================== */
hutchinsonApp.directive('requiredparttext', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).keyup(function(){
                if((($('#val_add_part_number').val()).trim().length == 0) || (($('#val_add_part_description').val()).trim().length == 0)) {
                    $('#btnAddNewPart').css('pointer-events', 'none').removeClass('disabled').addClass('disabled');
                }
                else
                {
                    $('#btnAddNewPart').css('pointer-events', 'auto').removeClass('disabled');
                }
            });
        }
    };
});

/* =======================================================================
    HUTCHINSON[2.2.3] - UNUSED DIRECTIVES
========================================================================== */
// hutchinsonApp.directive('submitmaintenancedirective', function() {
//     return {
//         // Restrict it to be an attribute in this case
//         restrict: 'E',
//         // responsible for registering DOM listeners as well as updating the DOM
//         link: function(scope, element, attrs) {
//             $( "#inputFromDateMain" ).datepicker({
//                 defaultDate: "+1w",
//                 changeMonth: true,
//                 numberOfMonths: 1,
//                 onClose: function( selectedDate ) {
//                     $( "#inputToDateMain" ).datepicker( "option", "minDate", selectedDate );
//                 }
//             });

//             $( "#inputToDateMain" ).datepicker({
//                 defaultDate: "+1w",
//                 changeMonth: true,
//                 numberOfMonths: 1,
//                 onClose: function( selectedDate ) {
//                     $( "#inputFromDateMain" ).datepicker( "option", "maxDate", selectedDate );
//                 }
//             });

//             $( "#mainLogDate" ).datetimepicker({step:10, format:'m/d/Y H:i', closeOnDateSelect: true});

//             var html_duration = '<select>';
//             for (var i=0; i<200; i++){
//                 html_duration += "<option value=" + [i]*5 + ">" + [i]*5 + " mins </option>" ;
//             }
//             html_duration += '</select>';
//             $('#mainLogDuration').html( html_duration );
//         }
//     };
// });

// hutchinsonApp.directive('submitdowntimedirective', function() {
//     return {
//         // Restrict it to be an attribute in this case
//         restrict: 'E',
//         // responsible for registering DOM listeners as well as updating the DOM
//         link: function(scope, element, attrs) {
//             $( "#inputFromDateDown" ).datepicker({
//                 defaultDate: "+1w",
//                 changeMonth: true,
//                 numberOfMonths: 1,
//                 onClose: function( selectedDate ) {
//                     $( "#inputToDateDown" ).datepicker( "option", "minDate", selectedDate );
//                 }
//             });
//             $( "#inputToDateDown" ).datepicker({
//                 defaultDate: "+1w",
//                 changeMonth: true,
//                 numberOfMonths: 1,
//                 onClose: function( selectedDate ) {
//                     $( "#inputFromDateDown" ).datepicker( "option", "maxDate", selectedDate );
//                 }
//             });

//             $("#downLogStartTime").datetimepicker({step:10, format:'m/d/Y H:i', closeOnDateSelect: true});

//             var html_duration = '<select>';
//             for (var i=0; i<200; i++){
//                 html_duration += "<option value=" + [i]*5 + ">" + [i]*5 + " mins </option>" ;
//             }
//             html_duration += '</select>';
//             $("#downLogDuration").html( html_duration );
//         }
//     };
// });

// hutchinsonApp.directive('navswitchactivelink', function() {
//     return {
//         // Restrict it to be an attribute in this case
//         restrict: 'A',
//         // responsible for registering DOM listeners as well as updating the DOM
//         link: function(scope, element, attrs) {
//             $(element).on('click', function() {
//                 $('.navbar-nav li').removeClass("active");
//                 $(this).parent().addClass("active");
//                 if($(this).parents("li").hasClass("dropdown")) {
//                     $(this).parents("li.dropdown").addClass("active");
//                 }
//             });
//         }
//     };
// });

/* =======================================================================
    HUTCHINSON[3] - CONTROLLERS
    - Get data from the database
    - Set Angular variables to be used for display data.
========================================================================== */

/* =======================================================================
    HUTCHINSON[3.1] - ADMIN CELL SCHEDULE CONTROLLER
    - Get data from the database
    - Set Angular variables to be used for display data.
    - Functions to control actions of the schedule page.
========================================================================== */
function adminCellScheduleController($scope, $http) {
    // DEFINE OBJECTS
    // ===================================================================
    $scope.cellSchedule = [];
    $scope.boxID;
    $scope.cellInfo = {};
    $scope.parts = {};
    $scope.parentParts = {};
    $scope.completedOrders = {};
    var selectedCell;
    var oldDisplayOrderIDs;

    // INITIALZE DATA ON PAGE
    // ===================================================================
    // Box Schedule Parts
    var request = $http({
            method: "post",
            url: "/get_cell_box_schedule",
            data: {
                cell_id: 5
            }
        })
        .success(function(data) {
            $scope.cellSchedule = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $http.post('/get_cells')
        .success(function(data) {
            $scope.cellInfo = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $http.post('/get_part')
        .success(function(data) {
            $scope.parts = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $http.post('/get_parent_part')
        .success(function(data) {
            $scope.parentParts = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $http.post('/get_completed_orders')
        .success(function(data) {
            if(data.length > 0) {
              $scope.completedOrders = data;
              $('#page-id-box-schedule-complete .ordersEmpty').remove();
              $('#page-id-box-schedule-complete table').show();
            }
            else {
                $('#page-id-box-schedule-complete table').hide();
                $('#page-id-box-schedule-complete').append('<span class="ordersEmpty">No Completed Orders!</span>');
            }
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    setTimeout(function() {
        $('#cellSelect').on('change', function() {
            $scope.getBoxScheduleNoDelay();
        });
    }, 250);

    setTimeout(function() {
        $('#box-schedule').sortable({
            handle: ".sortable-handle"
        });
        $('#box-schedule').disableSelection();
        $('#box-schedule').on('sortupdate', function( event, ui ) {
            for(var i = 0; i < $scope.cellSchedule.length; i++) {
                oldDisplayOrderIDs = $('#box-schedule').sortable("toArray", {attribute: 'data-boxid'});
                var request = $http({
                    method: "post",
                    url: "/update_box_schedule_order",
                    data: {
                        new_display_order: i,
                        image_id: parseInt(oldDisplayOrderIDs[i])
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            }
        });
    }, 250);

    // FUNCTIONS
    // ===================================================================
    // Function to create a range based on data passed from a ng-repeat
    $scope.range = function(min, max, step){
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) input.push(i);
        return input;
    };

    // Function to get the box schedule for a certain cell.
    // If you want another cell, change the "cell_id" below.
    $scope.getBoxSchedule = function() {
        // Don't run this function until 2 seconds after it is called.
        setTimeout(function(){
                var request = $http({
                    method: "post",
                    url: "/get_cell_box_schedule",
                    data: {
                        cell_id: $('#cellSelect').find('option:selected').val()
                    }
                })
                .success(function(data) {
                    // Refresh the data
                    $scope.cellSchedule = data;
                    resetButtons();
                    // Remove the class that is disabling the boxes
                    $('span[data*='+ $scope.boxID + ']').removeClass('schedule-box-disabled');
                    // Remove the class that is disabling the admin buttons
                    $('div#box-' + $scope.boxID + ' > section.box-schedule-admin a').removeClass('schedule-box-disabled');
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            }, 2000);
    }

    $scope.getBoxScheduleNoDelay = function() {
        selectedCell = $('#cellSelect').find('option:selected').val();
        var request = $http({
                method: "post",
                url: "/get_cell_box_schedule",
                data: {
                    cell_id: selectedCell
                }
            })
            .success(function(data) {
                console.log(data);
                if (data.length > 0) {
                    $('#box-schedule .scheduleEmpty').remove();
                    // Refresh the data
                    $scope.cellSchedule = data;
                    resetButtons();
                }
                else {
                    $scope.cellSchedule = [];
                    $('#box-schedule').append('<span class="scheduleEmpty">No Results Available</span>');
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    // Function for an admin to add another box
    $scope.adminAddBox = function(boxID) {
        var request = $http({
            method: "post",
            url: "/admin_box_schedule_increment",
            data: {
                queue_id: boxID
            }
        })
        .success(function(data) {
            $scope.getBoxScheduleNoDelay();
        })
        .error(function(data){
            console.log('Error: ' + data);
        });
    }

    // Function for an admin to remove a box
    $scope.adminRemoveBox = function(boxID, boxConsumed, boxQuantity) {
        if (boxQuantity == 1) {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Order quantity cannot be less than one box.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
        else {
            var request = $http({
                method: "post",
                url: "/admin_box_schedule_decrement",
                data: {
                    queue_id: boxID,
                    num_consumed: boxConsumed
                }
            })
            .success(function(data) {
                $scope.getBoxScheduleNoDelay();
            })
            .error(function(data){
                console.log('Error: ' + data);
            });
        }
    }

    $scope.handleBoxScheduleSubmit = function() {
        var partID = $('#box-part').find("option:selected").val();
        var partName = $('#box-part').find(":selected").text();
        var quantity = $('#box-quantity').val();
        var cellID = $('#box-cell').find("option:selected").val();
        var comment = $('#box-comment').val();
        var displayOrder;

        if(partID != 1 && cellID != 1) {
            var request = $http({
                method: "post",
                url: "/get_cell_box_schedule",
                data: {
                    cell_id: cellID
                }
            })
            .success(function(data) {
                displayOrder = data.length;
                var request = $http({
                    method: "post",
                    url: "/add_box_schedule",
                    data: {
                        cell_id: cellID,
                        part_id: partID,
                        box_quantity: quantity,
                        comment: comment,
                        display_order: displayOrder
                    }
                })
                .success(function(data) {
                    console.log('Successful.');
                    $('#box-part').find("option:first").attr('selected', 'selected');
                    $('#quizQuestionCategory').find("option:first").attr('selected', 'selected');
                    $('#box-quantity').val('');
                    $('#box-cell').find("option:first").attr('selected', 'selected');
                    $('#box-comment').val('');

                    var request = $http({
                        method: "post",
                        url: "/get_cell_box_schedule",
                        data: {
                            cell_id: $('#cellSelect').find('option:selected').val()
                        }
                    })
                    .success(function(data) {
                        $scope.cellSchedule = data;
                        resetButtons();
                        $('#app-notifications p').text('A box schedule for part ' + partName + ' has been added.');
                        notificationPopup();
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                })
                .error(function(data){
                    console.log('Error: ' + data);
                });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
        else {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Please choose a valid part number and cell number.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
    }

    $scope.adminEditComment = function(boxID) {
        var initialComment = $('section#box-schedule > div#box-' + boxID + ' > span').text();
        $('section#box-schedule > div#box-' + boxID + ' > span').hide();
        $('section#box-schedule > div#box-' + boxID + ' input[name="boxComment"]').val(initialComment);
        $('section#box-schedule > div#box-' + boxID + ' input[name="boxComment"]').show();
        $('section#box-schedule > div#box-' + boxID + ' a.adminEditComment').hide();
        $('section#box-schedule > div#box-' + boxID + ' a.adminSaveComment').css({'display':'inline-block'});
    }

    $scope.adminAddComment = function(boxID) {
        $('section#box-schedule > div#box-' + boxID + ' input[name="boxComment"]').show();
        $('section#box-schedule > div#box-' + boxID + ' a.adminAddComment').hide();
        $('section#box-schedule > div#box-' + boxID + ' a.adminSaveComment').css({'display':'inline-block'});
    }

    $scope.adminSaveComment = function(boxID) {
        var comment = $('section#box-schedule > div#box-' + boxID + ' input[name="boxComment"]').val().trim();
        var request = $http({
                method: "post",
                url: "/box_schedule_comment",
                data: {
                    box_id: boxID,
                    comment: comment
                }
            })
            .success(function(data) {
                console.log("Success");
                var request = $http({
                    method: "post",
                    url: "/get_cell_box_schedule",
                    data: {
                        cell_id: $('#cellSelect').find('option:selected').val()
                    }
                })
                .success(function(data) {
                    $scope.cellSchedule = data;
                    resetButtons();
                    $('#app-notifications p').text('Your comment has been saved.');
                    notificationPopup();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.adminCompleteBox = function(boxID) {
        var confirm = window.confirm("Are you sure you want to complete this box?");
        if (confirm == true) {
            var request = $http({
                    method: "post",
                    url: "/box_schedule_complete",
                    data: {
                        queue_id: boxID,
                        admin_id: authenticated_users.admin.id
                    }
                })
                .success(function(data) {
                    console.log("Success");
                    var request = $http({
                        method: "post",
                        url: "/get_cell_box_schedule",
                        data: {
                            cell_id: $('#cellSelect').find('option:selected').val()
                        }
                    })
                    .success(function(data) {
                        $scope.cellSchedule = data;
                        setTimeout(function() {
                            oldDisplayOrderIDs = $('#box-schedule').sortable("toArray", {attribute: 'data-boxid'});

                            for(var i = 0; i < $scope.cellSchedule.length; i++) {
                                var request = $http({
                                    method: "post",
                                    url: "/update_box_schedule_order",
                                    data: {
                                        new_display_order: i,
                                        image_id: parseInt(oldDisplayOrderIDs[i])
                                    }
                                })
                                .success(function(data) {
                                    console.log("Success.");
                                })
                                .error(function(data) {
                                    console.log('Error: ' + data);
                                });
                            }
                            resetButtons();
                            $('#app-notifications p').text('Box schedule successfully completed.');
                            notificationPopup();
                        },250);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    }

    function resetButtons() {
        setTimeout(function() {
            $('#box-schedule > div').each(function() {
                if ($(this).find('span:first').is(':empty')) {
                    $(this).find('a.adminAddComment').css({'display':'inline-block'});
                }
                else {
                    $(this).find('a.adminEditComment').css({'display':'inline-block'});
                }
            });
        }, 200);
    }

    $scope.activateOrder = function(orderID, cellID) {
        var confirm = window.confirm("Are you sure you want to activate this order?");
        if (confirm == true) {
            var request = $http({
                method: "post",
                url: "/get_order_count_by_cell",
                data: {
                    cell_id: cellID
                }
            })
            .success(function(data) {
                var displayOrder = data[0].row_count;
                var request = $http({
                    method: "post",
                    url: "/get_box_completed_by_id",
                    data: {
                        box_id: orderID
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                    var request = $http({
                        method: "post",
                        url: "/activate_order",
                        data: {
                            activate_order_id: orderID,
                            display_order: displayOrder,
                            consumed: data[0].consumed
                        }
                    })
                    .success(function(data) {
                      //get_box_completed_by_id
                        $http.post('/get_completed_orders')
                        .success(function(data) {
                            if(data.length > 0) {
                              $scope.completedOrders = data;
                              $('#page-id-box-schedule-complete .ordersEmpty').remove();
                              $('#page-id-box-schedule-complete table').show();
                            }
                            else {
                                $('#page-id-box-schedule-complete table').hide();
                                $('#page-id-box-schedule-complete').append('<span class="ordersEmpty">No Completed Orders!</span>');
                            }
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                        $('#app-notifications p').text('The order has been activated successfully.');
                        notificationPopup();
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    }

    $scope.deleteOrder = function(orderID) {
        var confirm = window.confirm("Are you sure you want to delete this order?");
        if (confirm == true) {
            var request = $http({
                method: "post",
                url: "/remove_order",
                data: {
                    remove_order_id: orderID
                }
            })
            .success(function(data) {
                $http.post('/get_completed_orders')
                .success(function(data) {
                    if(data.length > 0) {
                      $scope.completedOrders = data;
                      $('#page-id-box-schedule-complete .ordersEmpty').remove();
                      $('#page-id-box-schedule-complete table').show();
                    }
                    else {
                        $('#page-id-box-schedule-complete table').hide();
                        $('#page-id-box-schedule-complete').append('<span class="ordersEmpty">No Completed Orders!</span>');
                    }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
                $('#app-notifications p').text('The order has been deleted successfully.');
                notificationPopup();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    }
}

/* =======================================================================
    HUTCHINSON[3.2] - ADMIN ADD PART CONTROLLER
    - Get data from the database
    - Set Angular variables to be used for display data.
    - Functions to control actions of the schedule page.
========================================================================== */
function adminAddPartController($scope, $http) {
    // DEFINE OBJECTS
    // ===================================================================
    $scope.parts = {};

    // INITIALZE DATA ON PAGE
    // ===================================================================// Parts
    $http.post('/get_part')
        .success(function(data) {
            $scope.parts = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // FUNCTIONS
    // ===================================================================
    // Function to add a new part to the parts list
    $scope.addNewPart = function() {
        var part_number = $('#val_add_part_number').val();
        var part_description = $('#val_add_part_description').val();

        // Check if part exists
        var request = $http({
                method: "post",
                url: "/get_part_by_number",
                data: {
                    part_number: part_number
                }
            })
            .success(function(data) {
                if(typeof data[0] === 'undefined') {
                    if(part_number != '' && part_description != '') {
                        var request = $http({
                            method: "post",
                            url: "/add_part",
                            data: {
                                part_number: part_number,
                                part_desc: part_description
                            }
                        })
                        .success(function(data) {
                            $scope.getAllParts();
                            $('#app-notifications p').text('The part, ' + part_number + ', has been added successfully.');
                            notificationPopup();
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                    }
                    else {
                        console.log('failed');
                    }
                }
                else {
                    $('#app-notifications').css('background-color', 'red');
                    $('#app-notifications p').text('Part Number ' + part_number + ' already exists. Please use another part number.');
                    notificationPopup();
                    setTimeout(function() {
                        $('#app-notifications').css('background-color', 'green');
                    }, 4000);

                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    // Function to get all parts
    $scope.getAllParts = function() {
        // Parts
        $http.post('/get_part')
            .success(function(data) {
                $scope.parts = data;
                $('#val_add_part_number').val('');
                $('#val_add_part_description').val('');
                $('#val_part_quantity').val('');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
}

/* =======================================================================
    HUTCHINSON[3.3] - ADMIN DELETE PART CONTROLLER
    - Get data from the database
    - Set Angular variables to be used for display data.
    - Functions to control actions of the schedule page.
========================================================================== */
function adminDeletePartController($scope, $http) {
    // DEFINE OBJECTS
    // ===================================================================
    $scope.parts = {};

    // INITIALZE DATA ON PAGE
    // ===================================================================// Parts
    $http.post('/get_part')
        .success(function(data) {
            $scope.parts = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // FUNCTIONS
    // ===================================================================
    // Function to delete the selected part
    $scope.deleteParts = function(part_id, partNumber) {
        var partID = part_id;
        var confirm = window.confirm("Are you sure you want to delete this part? " + partNumber);
        if (confirm == true) {
            var request = $http({
                method: "post",
                url: "/remove_part",
                data: {
                    remove_part_id: partID
                }
            })
            .success(function(data) {
                $scope.getAllParts();
                $('#app-notifications p').text('The part has been deleted successfully.');
                notificationPopup();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    }

    // Function to get all parts
    $scope.getAllParts = function() {
        // Parts
        $http.post('/get_part')
            .success(function(data) {
                $scope.parts = data;
                $('#val_add_part_number').val('');
                $('#val_add_part_description').val('');
                $('#val_part_quantity').val('');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
}

/* =======================================================================
    HUTCHINSON[3.3] - ADMIN EDIT PART CONTROLLER
    - Get data from the database
    - Set Angular variables to be used for display data.
    - Functions to control actions of the schedule page.
========================================================================== */
function adminEditPartController($scope, $http) {
    // DEFINE OBJECTS
    // ===================================================================
    $scope.parts = {};
    var editingPartID;
    $scope.editingPart = {};

    // INITIALZE DATA ON PAGE
    // ===================================================================// Parts
    $http.post('/get_part')
        .success(function(data) {
            $scope.parts = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // FUNCTIONS
    // ===================================================================
    // Function to edit the selected part
    $scope.showEditPart = function(partID) {
        editingPartID = partID;
        var request = $http({
            method: "post",
            url: "/get_part_by_id",
            data: {
                part_id: partID
            }
        })
        .success(function(data) {
            $('#partNumber').val(data[0].number);
            $('.hiddenPartNumber').val(data[0].number);
            $('#partDescription').val(data[0].desc);
            $('.editPartList').slideUp();
            $('.editPartRow').slideDown();
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }

    $scope.cancelEditPart = function() {
        $('#partNumber').val('');
        $('.hiddenPartNumber').val('');
        $('#partDescription').val('');
        $('.editPartRow').slideUp();
        $('.editPartList').slideDown();
    }

    $scope.editPart = function() {
        var partNumber = $('#partNumber').val();
        var partDescription = $('#partDescription').val();
        if(partNumber != '' && partDescription != '') {

            var request = $http({
                method: "post",
                url: "/get_part_by_number",
                data: {
                    part_number: partNumber
                }
            })
            .success(function(data) {
                if ( data.length <= 0 || partNumber === $('.hiddenPartNumber').val() ) {
                    var request = $http({
                        method: "post",
                        url: "/edit_part_by_id",
                        data: {
                            part_number: partNumber,
                            part_description: partDescription,
                            part_id: editingPartID
                        }
                    })
                    .success(function(data) {
                        $scope.parts = {};
                        $('#partNumber').val('');
                        $('#partDescription').val('');
                        $scope.getAllParts();
                        $('.editPartRow').slideUp();
                        $('.editPartList').slideDown();
                        $('#app-notifications p').text('Part has been edited successfully.');
                        notificationPopup();
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                }
                else {
                    $('#app-notifications').css('background-color', 'red');
                    $('#app-notifications p').text('Part Number already exists!');
                    notificationPopup();
                    setTimeout(function() {
                        $('#app-notifications').css('background-color', 'green');
                    }, 4000);
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
        else {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Part Number and Part Description are required.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
    }

    // Function to get all parts
    $scope.getAllParts = function() {
        // Parts
        $http.post('/get_part')
            .success(function(data) {
                $scope.parts = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
}

/* =======================================================================
    HUTCHINSON[3.4] - ADMIN PART RELATIONSHIP CONTROLLER
    - Get data from the database
    - Set Angular variables to be used for display data.
    - Functions to control actions of the schedule page.
========================================================================== */
function adminPartRelationshipController($scope, $http) {
    // DEFINE OBJECTS
    // ===================================================================
    $scope.parts = {};
    $scope.childParts = {};
    $scope.parentParts = {};

    // INITIALZE DATA ON PAGE
    // ===================================================================
    // Parts
    $http.post('/get_part')
        .success(function(data) {
            $scope.parts = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Parent Parts
    $http.post('/get_parent_part')
        .success(function(data) {
            $scope.parentParts = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // FUNCTIONS
    // ===================================================================
    // Function to get Child Parts
    $scope.getChildParts = function() {
        var parentPartNumber = ($('#search-field').val()).trim();
        for (var i=0; i < $scope.parts.length; i++) {
            if ($scope.parts[i].number === parentPartNumber) {
                parentPartNumber = $scope.parts[i].id;
            }
        }
        if (parentPartNumber != 1 && typeof parentPartNumber == 'number') {
            var request = $http({
                method: "post",
                url: "/bom_part2",
                data: {
                    part_number: parentPartNumber
                }
            })
            .success(function(data) {
                if(data.length > 0) {
                    $scope.childParts = data;
                    if($('#orderTable').length) {
                        $('#orderTable').removeClass('hide');
                    }
                }
                else {
                    $scope.childParts = {};
                    $('#app-notifications p').text('There are no child parts! You can add one now!');
                    notificationPopup();
                }
            })
            .error(function(data){
                console.log('Error: ' + data);
            });
        }
        else {
            $scope.childParts = {};
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Please choose a valid parent part.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
    }

    $scope.marryParts = function() {
        var parentID = ($('#search-field').val()).trim();
        var childID = ($('#add-part-search').val()).trim();
        for (var i=0; i < $scope.parts.length; i++) {
            if ($scope.parts[i].number === parentID) {
                parentID = $scope.parts[i].id;
            }
            if ($scope.parts[i].number === childID) {
                childID = $scope.parts[i].id;
            }
        }
        if(typeof parentID == 'number' && typeof childID == 'number') {
            var request = $http({
                method: "post",
                url: "/add_part_relation",
                data: {
                    part_parent_id: parentID,
                    part_child_id: childID
                }
            })
            .success(function(data) {
                $scope.getChildParts();
                $('#add-part-search').val('');
                $('#app-notifications p').text('Part relationship has been added successfully.');
                notificationPopup();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
        else {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Please choose a valid parent and child part.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
    }

    $scope.removePartRelation = function(child_id) {
        var childID = child_id;
        var confirm = window.confirm("Are you sure you want to remove this relationship?");
        if (confirm == true) {
            var request = $http({
                method: "post",
                url: "/remove_part_relation",
                data: {
                    remove_part_id: childID
                }
            })
            .success(function(data) {
                $scope.getChildParts();
                $('#app-notifications p').text('Relationship successfully removed.');
                notificationPopup();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    }

    // Function to get all parts
    $scope.getAllParts = function() {
        // Parts
        $http.post('/get_part')
            .success(function(data) {
                $scope.parts = data;
                $('#val_add_part_number').val('');
                $('#val_add_part_description').val('');
                $('#val_part_quantity').val('');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
}

/* =======================================================================
    HUTCHINSON[3.7] - USER CONTROLLER
    - Get data from the database
    - Set Angular variables to be used for display data.
    - Functions to control actions of the schedule page.
    - Will contain functions for logging in.
========================================================================== */
function userController($scope, $http, $upload) {
    // DEFINE OBJECTS
    // ===================================================================
    $scope.users = {};
    $scope.userRoles = {};
    $scope.userLoggedIn = {};
    $scope.parts = {};
    $scope.cells = {};
    $scope.userPermissions = [];
    var badgeSwipes = {};
    var selectedUser = {};
	// $scope.userLoggedIn = authenticated_users.operator;

    // INITIALZE DATA ON PAGE
    // ===================================================================
    // Get Users
    $http.post('/get_users')
        .success(function(data) {
            $scope.users = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Get User Roles
    $http.post('/get_privilege')
        .success(function(data) {
            $scope.userRoles = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $http.post('/get_parent_part')
        .success(function(data) {
            $scope.parts = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $http.post('/get_cells')
        .success(function(data) {
            $scope.cells = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    if ($('#page-id-add-user').length > 0) {
        badgeSwipeInterval = setInterval(function() {
            $http.post('/get_badge_swipes')
                .success(function(data) {
                    var selectedReader = $('#badge-reader').find('option:selected').val();
                    for ( var i = 0; i < data.length; i++ ) {
                        if ( data[i].cell_name === selectedReader ) {
                            $('input#badge').val(data[i].value);
                        }
                    }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }, 15000);
    }

    if ($('#page-id-user-roles').length > 0) {
        editBadgeSwipeInterval = setInterval(function() {
            $http.post('/get_badge_swipes')
                .success(function(data) {
                    var selectedReader = $('#badge-reader').find('option:selected').val();
                    for ( var i = 0; i < data.length; i++ ) {
                        if ( data[i].cell_name === selectedReader ) {
                            $('input#badge').val(data[i].value);
                        }
                    }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }, 1000);
    }

    // FUNCTIONS
    // ===================================================================
    $scope.addUserBadgeNumber = function() {
        $('#badge').val($('.badgeReadFromDB').text());
    }

    $scope.deleteUser = function(user_id, username) {
        var confirm = window.confirm("Are you sure you want to delete " + username + "?");
        if (confirm == true) {
            var request = $http({
                method: "post",
                url: "/delete_user",
                data: {
                    user_id: user_id
                }
            })
            .success(function(data) {
                console.log("Success");
                $http.post('/get_users')
                    .success(function(data) {
                        $scope.users = data;
                        $('#app-notifications p').text(username + ' has been deleted successfully.');
                        notificationPopup();
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    }

    // $scope.editUser = function(user_id) {
    //     var selectedUserPosition = $('#user-' + user_id + ' div.user-information > .user-position').text();

    //     $('#user-' + user_id + ' div.user-information > .user-position').hide();
    //     $('#user-' + user_id + ' div.user-information > .user-roles').show();
    //     $('#user-' + user_id + ' .user-buttons .user-buttons-edit').hide();
    //     $('#user-' + user_id + ' .user-buttons .user-buttons-save').show();

    //     $('#user-' + user_id + ' [name="privilege"] option').filter(function() {
    //         return($(this).text() == selectedUserPosition);
    //     }).prop('selected', true);
    // }

    $scope.saveEditsUser = function() {
        var selectedOption = $('.user-roles').find("option:selected").val();
        var userID = $('#userPermissionsID').val();

        var request = $http({
            method: "post",
            url: "/save_user_role",
            data: {
                user_id: userID,
                user_role_id: selectedOption
            }
        })
        .success(function(data) {
            console.log("success");
            $http.post('/get_users')
                .success(function(data) {
                    $scope.users = data;
                    $('#app-notifications p').text('User role has been successfully changed.');
                    notificationPopup();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }

    $scope.editUserBadgeNumber = function() {
        var newBadge = $('input#badge').val();
        var userID = $('#userPermissionsID').val();
        if ( newBadge !== '' ) {
            var request = $http({
                method: "post",
                url: "/edit_user_badge",
                data: {
                    user_id: userID,
                    badge: newBadge
                }
            })
            .success(function(data) {
                console.log("success");
                $('#app-notifications p').text('User Badge has been updated successfully.');
                notificationPopup();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
        else {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Please enter a valid user badge.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
    }

    $scope.saveImagePath = function() {
        var userID = $('#userPermissionsID').val();
        var fullPath = document.getElementById('image').value;
        if (fullPath != "") {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var imagePath = fullPath.substring(startIndex);
            if (imagePath.indexOf('\\') === 0 || imagePath.indexOf('/') === 0) {
                imagePath = '/images/users/' + imagePath.substring(1);
            }
        }
        else {
            imagePath = selectedUser[0].image_path;
        }

        var request = $http({
                method: "post",
                url: "/edit_user_image_path",
                data: {
                    user_id: userID,
                    image_path: imagePath
                }
            })
            .success(function(data) {
                $http.post('/get_users')
                    .success(function(data) {
                        $scope.users = data;
                        $('#app-notifications p').text('User Image has been updated successfully.');
                        notificationPopup();
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.showUserPermissions = function(userID, userName) {
        var request = $http({
                method: "post",
                url: "/get_user_by_id",
                data: {
                    user_id: userID
                }
            })
            .success(function(data) {
                selectedUser = data;
                $('.user-roles').find('option[value='+selectedUser[0].privilege_id+']').attr('selected', 'selected');
                $('.userPermissionsName').text(selectedUser[0].name);
                $('#editUserName').val(selectedUser[0].name);
                $('#user-image-placeholder img').attr('src', '..'+selectedUser[0].image_path);
                $('input#badge').attr('placeholder', selectedUser[0].badge);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        var request = $http({
            method: "post",
            url: "/get_user_permissions",
            data: {
                user_id: userID
            }
        })
        .success(function(data) {
            console.log("success");
            $scope.userPermissions = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

        $('#userPermissionsID').val(userID);
        $('#userPermissionsCells').find('option:first').attr('selected', 'selected');
        $('#userPermissionsParts').find('option:first').attr('selected', 'selected');
        $('#page-id-user-roles .editUserRolesContainer').slideUp();
        $('#page-id-user-roles .editUserPermissionsContainer').slideDown();
    }

    $scope.cancelUserPermission = function() {
        $('#page-id-user-roles .editUserPermissionsContainer').slideUp();
        $('#page-id-user-roles .editUserRolesContainer').slideDown();
        $('#image').replaceWith($('#image').val('').clone(true));
    }

    $scope.addUserPermission = function() {
        var userID = $('#userPermissionsID').val();
        var cellID = $('#userPermissionsCells').find('option:selected').val();
        var partID = $('#userPermissionsParts').find('option:selected').val();
        var okToInsert = true;
        $.each($scope.userPermissions, function(index, value) {
            if(value.cell_id == cellID && value.part_id == partID) {
                $('#app-notifications').css('background-color', 'red');
                $('#app-notifications p').text('User Permission already exists.');
                notificationPopup();
                setTimeout(function() {
                    $('#app-notifications').css('background-color', 'green');
                }, 4000);
                okToInsert = false;
                return false;
            }
            else {
                okToInsert = true;
            }
        });
        if (okToInsert == true) {
            if(cellID != 1 && partID != 1) {
                var request = $http({
                        method: "post",
                        url: "/add_user_permission",
                        data: {
                            cell_id: cellID,
                            part_id: partID,
                            user_id: userID
                        }
                    })
                    .success(function(data2) {
                        console.log("Success!");
                        $scope.userPermissions = [];
                        var request = $http({
                                method: "post",
                                url: "/get_user_permissions",
                                data: {
                                    user_id: userID
                                }
                            })
                            .success(function(data) {
                                console.log("success");
                                $scope.userPermissions = data;
                                $('#app-notifications p').text('User Permission has been added successfully.');
                                notificationPopup();
                            })
                            .error(function(data) {
                                console.log('Error: ' + data);
                            });
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            }
            else {
                $('#app-notifications').css('background-color', 'red');
                $('#app-notifications p').text('Please choose a valid Cell and Part.');
                notificationPopup();
                setTimeout(function() {
                    $('#app-notifications').css('background-color', 'green');
                }, 4000);
            }
        }
    }

    $scope.deleteUserPermission = function(permissionID) {
        var confirm = window.confirm("Are you sure you want to delete this permission?");
        if (confirm == true) {
            var userID = $('#userPermissionsID').val();
            var request = $http({
                    method: "post",
                    url: "/delete_user_permission",
                    data: {
                        permission_id: permissionID
                    }
                })
                .success(function(data2) {
                    console.log("Success!");
                    $scope.userPermissions = [];
                    var request = $http({
                            method: "post",
                            url: "/get_user_permissions",
                            data: {
                                user_id: userID
                            }
                        })
                        .success(function(data) {
                            console.log("success");
                            $scope.userPermissions = data;
                            $('#app-notifications p').text('User Permission has been deleted successfully.');
                            notificationPopup();
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    }

    $scope.upload = function (files) {
        if (files && files.length) {

            var reader = new FileReader();
            reader.onload = function (e) {
                $('#user-image-placeholder > img').attr('src', e.target.result);
            }
            reader.readAsDataURL(files[0]);

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: '/user_image_upload',
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
                });
            }
        }
    }

    $scope.handleAddUserSubmit = function() {
        var fullPath = document.getElementById('image').value;
        if (fullPath != "") {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var imagePath = fullPath.substring(startIndex);
            if (imagePath.indexOf('\\') === 0 || imagePath.indexOf('/') === 0) {
                imagePath = '/images/users/' + imagePath.substring(1);
            }
        }
        else {
            imagePath = '/images/users/default-user.png';
        }

        var userName = ($('#username').val()).trim();
        var privilegeID = $('#privilege').val();
        var badgeNumber = ($('#badge').val()).trim();

        if (badgeNumber != '') {
            // badgeNumber = badgeNumber + "\r\n";

            var request = $http({
                    method: "post",
                    url: "/check_badge",
                    data: {
                        badge: badgeNumber
                    }
                })
                .success(function(data) {
                    if(data.length > 0) {
                        $('#app-notifications').css('background-color', 'red');
                        $('#app-notifications p').text('Badge Number ' + badgeNumber + ' already exists. Please swipe another badge.');
                        notificationPopup();
                        setTimeout(function() {
                            $('#app-notifications').css('background-color', 'green');
                        }, 4000);
                    }
                    else {
                        var request = $http({
                            method: "post",
                            url: "/add_new_user",
                            data: {
                                user_name: userName,
                                badge_number: badgeNumber,
                                path_to_image: imagePath
                            }
                        })
                        .success(function(data) {
                            var request = $http({
                                method: "post",
                                url: "/add_new_user_privilege",
                                data: {
                                    badge_number: badgeNumber,
                                    privilege_id: privilegeID
                                }
                            })
                            .success(function(data) {
                                console.log('Success');
                                $('#username').val('');
                                $('#position-title').val('');
                                $('#privilege').find('option:first').attr('selected', 'selected');
                                $('#badge').val('');
                                $('#user-image-placeholder > img').attr('src', '../images/users/default-user.png');
                                $('#image').replaceWith($('#image').val('').clone(true));
                                $('#app-notifications p').text(userName + ' has been added successfully.');
                                notificationPopup();
                            })
                            .error(function(data) {
                                console.log('Error: ' + data);
                            });
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                    }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
        else {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Please select a badge.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
    }

    $scope.saveUserName = function() {
        var userName = $('#editUserName').val().trim();
        var userID = $('#userPermissionsID').val();
        if(userName != '') {
            var request = $http({
                method: "post",
                url: "/update_user_name",
                data: {
                    user_name: userName,
                    user_id: userID
                }
            })
            .success(function(data2) {
                console.log('success.');
                $http.post('/get_users')
                    .success(function(data) {
                        $scope.users = data;
                        $('.userPermissionsName').html(userName);
                        $('#app-notifications p').text('Name successfully changed to ' + userName);
                        notificationPopup();
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
        else {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Please enter a valid user name.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
    }
}

/* =======================================================================
    HUTCHINSON[3.8] - QUIZ CONTROLLER
    - Get data from the database
    - Set Angular variables to be used for display data.
    - Functions to control actions of the schedule page.
========================================================================== */
function adminQuizController($scope, $http, $location, $upload) {
    // DEFINE OBJECTS
    // ===================================================================
    $scope.parts = {};
    $scope.cellInfo = {};
    $scope.questions = [];

    // INITIALZE DATA ON PAGE
    // ===================================================================
    // Parts
    $http.post('/get_parent_part')
        .success(function(data) {
            $scope.parts = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Cell
    $http.post('/get_cells')
        .success(function(data) {
            $scope.cellInfo = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Get Questions
    $http.post('/get_all_quiz_questions')
        .success(function(data) {
            $scope.questions = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // FUNCTIONS
    // ===================================================================
    $scope.upload = function (files) {
        if (files && files.length) {

            var reader = new FileReader();
            reader.onload = function (e) {
                $('#question-image-placeholder > img').attr('src', e.target.result);
            }
            reader.readAsDataURL(files[0]);

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: '/quiz_question_image_upload',
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
                });
            }
        }
    }

    $scope.handleQuizSubmit = function() {
        var fullPath = document.getElementById('image').value;
        if (fullPath != "") {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var imagePath = fullPath.substring(startIndex);
            if (imagePath.indexOf('\\') === 0 || imagePath.indexOf('/') === 0) {
                imagePath = '/images/quiz/questions/' + imagePath.substring(1);
            }
        }
        else {
            imagePath = null;
        }

        var partID = $('#quizQuestionPart').find('option:selected').val();
        var cellID = $('#quizQuestionCell').find('option:selected').val();
        var category = $('#quizQuestionCategory').find(":selected").val();
        var quizQuestion = $('#quizQuestion').val().trim();
        var quizAnswer1 = $('#quizAnswer1').val().trim();
        var quizAnswer2 = $('#quizAnswer2').val().trim();
        var quizAnswer3 = $('#quizAnswer3').val().trim();
        var quizAnswer4 = $('#quizAnswer4').val().trim();
        var correctAnswer = $('#quizCorrectAnswer').find('option:selected').val();

        // If the category chosen is part-specific
        if(category === "part-specific") {
            if (partID == 1) {
                $('#app-notifications').css('background-color', 'red');
                $('#app-notifications p').text('Please select a valid Part ID.');
                notificationPopup();
                setTimeout(function() {
                    $('#app-notifications').css('background-color', 'green');
                }, 4000);
            }
            else {
                var request = $http({
                    method: "post",
                    url: "/add_quiz_question_part",
                    data: {
                        part_id: partID,
                        question: quizQuestion,
                        answer_correct: correctAnswer,
                        answer_1: quizAnswer1,
                        answer_2: quizAnswer2,
                        answer_3: quizAnswer3,
                        answer_4: quizAnswer4,
                        category: category,
                        image_path: imagePath
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                    // Get Questions
                    $http.post('/get_all_quiz_questions')
                        .success(function(data) {
                            console.log("Success.");
                            $scope.questions = data;

                            $('#quizQuestionPart').find('option:first').attr('selected', 'selected');
                            $('#quizQuestionCell').find('option:first').attr('selected', 'selected');
                            $('#quizQuestion').val('');
                            $('#quizAnswer1').val('');
                            $('#quizAnswer2').val('');
                            $('#quizAnswer3').val('');
                            $('#quizAnswer4').val('');
                            $('#quizCorrectAnswer').find('option:first').attr('selected', 'selected');
                            $('#question-image-placeholder > img').attr('src', '../images/users/default-user.png');
                            $('#image').replaceWith($('#image').val('').clone(true));

                            $('#app-notifications p').text('Quiz question has been added successfully.');
                            notificationPopup();
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            }
        }
        else if (category === "cell-safety") {
            if (cellID == 1) {
                $('#app-notifications').css('background-color', 'red');
                $('#app-notifications p').text('Please select a valid Cell ID.');
                notificationPopup();
                setTimeout(function() {
                    $('#app-notifications').css('background-color', 'green');
                }, 4000);
            }
            else {
                var request = $http({
                    method: "post",
                    url: "/add_quiz_question_cell",
                    data: {
                        cell_id: cellID,
                        question: quizQuestion,
                        answer_correct: correctAnswer,
                        answer_1: quizAnswer1,
                        answer_2: quizAnswer2,
                        answer_3: quizAnswer3,
                        answer_4: quizAnswer4,
                        category: category,
                        image_path: imagePath
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                    // Get Questions
                    $http.post('/get_all_quiz_questions')
                        .success(function(data) {
                            console.log("Success.");
                            $scope.questions = data;

                            $('#quizQuestionPart').find('option:first').attr('selected', 'selected');
                            $('#quizQuestionCell').find('option:first').attr('selected', 'selected');
                            $('#quizQuestion').val('');
                            $('#quizAnswer1').val('');
                            $('#quizAnswer2').val('');
                            $('#quizAnswer3').val('');
                            $('#quizAnswer4').val('');
                            $('#quizCorrectAnswer').find('option:first').attr('selected', 'selected');
                            $('#question-image-placeholder > img').attr('src', '../images/users/default-user.png');
                            $('#image').replaceWith($('#image').val('').clone(true));

                            $('#app-notifications p').text('Quiz question has been added successfully.');
                            notificationPopup();
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            }
        }
        else if (category === "part-cell-specific") {
            if (cellID == 1 || partID == 1) {
                $('#app-notifications').css('background-color', 'red');
                $('#app-notifications p').text('Please select a valid Cell ID or Part ID.');
                notificationPopup();
                setTimeout(function() {
                    $('#app-notifications').css('background-color', 'green');
                }, 4000);
            }
            else {
                var request = $http({
                    method: "post",
                    url: "/add_quiz_question_part_cell",
                    data: {
                        part_id: partID,
                        cell_id: cellID,
                        question: quizQuestion,
                        answer_correct: correctAnswer,
                        answer_1: quizAnswer1,
                        answer_2: quizAnswer2,
                        answer_3: quizAnswer3,
                        answer_4: quizAnswer4,
                        category: category,
                        image_path: imagePath
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                    // Get Questions
                    $http.post('/get_all_quiz_questions')
                        .success(function(data) {
                            console.log("Success.");
                            $scope.questions = data;

                            $('#quizQuestionPart').find('option:first').attr('selected', 'selected');
                            $('#quizQuestionCell').find('option:first').attr('selected', 'selected');
                            $('#quizQuestion').val('');
                            $('#quizAnswer1').val('');
                            $('#quizAnswer2').val('');
                            $('#quizAnswer3').val('');
                            $('#quizAnswer4').val('');
                            $('#quizCorrectAnswer').find('option:first').attr('selected', 'selected');
                            $('#question-image-placeholder > img').attr('src', '../images/users/default-user.png');
                            $('#image').replaceWith($('#image').val('').clone(true));

                            $('#app-notifications p').text('Quiz question has been added successfully.');
                            notificationPopup();
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            }
        }
    }

    $scope.deleteQuizQuestion = function(questionID) {
        var confirm = window.confirm("Are you sure you want to delete this question?");
        if (confirm == true) {
            var request = $http({
                method: "post",
                url: "/delete_quiz_question",
                data: {
                    question_id: questionID
                }
            })
            .success(function(data) {
                console.log("Success.");
                $scope.questions = [];
                // Get Questions
                $http.post('/get_all_quiz_questions')
                    .success(function(data) {
                        console.log("Success.");
                        $sccope.questions = data;
                        $('#app-notifications p').text('Quiz question has been deleted successfully.');
                        notificationPopup();

                        setTimeout(function() {
                            $('.viewQuestionInfoButton').on('click', function(event) {
                                event.stopPropagation();
                                $(this).hide();
                                $(this).parent().children('.hideQuestionInfoButton').show();
                                $(this).parent().parent().children('.quizQuestionInfo').slideDown();
                            });

                            $('.hideQuestionInfoButton').on('click', function(event) {
                                event.stopPropagation();
                                $(this).hide();
                                $(this).parent().children('.viewQuestionInfoButton').show();
                                $(this).parent().parent().children('.quizQuestionInfo').slideUp();
                            });

                            $('.quizQuestionTitle').on('click', function() {
                                if ($(this).children('.viewQuestionInfoButton').is(':visible')) {
                                    $(this).children('.viewQuestionInfoButton').hide();
                                    $(this).children('.hideQuestionInfoButton').show();
                                    $(this).parent().children('.quizQuestionInfo').slideDown();
                                }
                                else {
                                    $(this).children('.viewQuestionInfoButton').show();
                                    $(this).children('.hideQuestionInfoButton').hide();
                                    $(this).parent().children('.quizQuestionInfo').slideUp();
                                }
                            });
                        }, 250);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    }

    $scope.editQuizQuestion = function(questionID) {
        var request = $http({
                method: "post",
                url: "/get_quiz_question_by_id",
                data: {
                    question_id: questionID
                }
            })
            .success(function(data) {
                console.log("Success.");
                if(data[0].category == "part-specific") {
                    $('#editQuizQuestionCategory').find('option[value="'+data[0].category+'"]').attr('selected', 'selected');
                    $('#showQuizPart').show();
                    $('#showQuizCell').hide();
                    $('#editQuizQuestionPart').find('option[value="'+data[0].part_id+'"]').attr('selected', 'selected');
                    if(data[0].image_path == null) {
                        $('#editQuizQuestionType').find('option[value="text"]').attr('selected', 'selected');
                        $('#add-new-question-image').hide();
                    }
                    else {
                        $('#editQuizQuestionType').find('option[value="image"]').attr('selected', 'selected');
                        $('#add-new-question-image').show();
                        $('#question-image-placeholder img').attr('src', '..'+data[0].image_path);
                        $('#quizQuestionImagePath').val(data[0].image_path);
                    }
                    $('#editQuizQuestion').val(data[0].question);
                    $('#editQuizAnswer1').val(data[0].answer_1);
                    $('#editQuizAnswer2').val(data[0].answer_2);
                    $('#editQuizAnswer3').val(data[0].answer_3);
                    $('#editQuizAnswer4').val(data[0].answer_4);
                    $('#editQuizCorrectAnswer').find('option[value="'+data[0].answer_correct+'"]').attr('selected', 'selected');
                    $('#selectedQuestionID').val(questionID);
                    $('#deleteQuizQuestions').slideUp();
                    $('#createQuizQuestions').slideDown();
                }
                else if(data[0].category == "cell-safety") {
                    $('#editQuizQuestionCategory').find('option[value="'+data[0].category+'"]').attr('selected', 'selected');
                    $('#showQuizPart').hide();
                    $('#showQuizCell').show();
                    $('#editQuizQuestionCell').find('option[value="'+data[0].cell_id+'"]').attr('selected', 'selected');
                    if(data[0].image_path == null) {
                        $('#editQuizQuestionType').find('option[value="text"]').attr('selected', 'selected');
                        $('#add-new-question-image').hide();
                    }
                    else {
                        $('#editQuizQuestionType').find('option[value="image"]').attr('selected', 'selected');
                        $('#add-new-question-image').show();
                        $('#question-image-placeholder img').attr('src', '..'+data[0].image_path);
                        $('#quizQuestionImagePath').val(data[0].image_path);
                    }
                    $('#editQuizQuestion').val(data[0].question);
                    $('#editQuizAnswer1').val(data[0].answer_1);
                    $('#editQuizAnswer2').val(data[0].answer_2);
                    $('#editQuizAnswer3').val(data[0].answer_3);
                    $('#editQuizAnswer4').val(data[0].answer_4);
                    $('#editQuizCorrectAnswer').find('option[value="'+data[0].answer_correct+'"]').attr('selected', 'selected');
                    $('#selectedQuestionID').val(questionID);
                    $('#deleteQuizQuestions').slideUp();
                    $('#createQuizQuestions').slideDown();
                }
                else if(data[0].category == "part-cell-specific") {
                    $('#editQuizQuestionCategory').find('option[value="'+data[0].category+'"]').attr('selected', 'selected');
                    $('#showQuizPart').show();
                    $('#showQuizCell').show();
                    $('#editQuizQuestionPart').find('option[value="'+data[0].part_id+'"]').attr('selected', 'selected');
                    $('#editQuizQuestionCell').find('option[value="'+data[0].cell_id+'"]').attr('selected', 'selected');
                    if(data[0].image_path == null) {
                        $('#editQuizQuestionType').find('option[value="text"]').attr('selected', 'selected');
                        $('#add-new-question-image').hide();
                    }
                    else {
                        $('#editQuizQuestionType').find('option[value="image"]').attr('selected', 'selected');
                        $('#add-new-question-image').show();
                        $('#question-image-placeholder img').attr('src', '..'+data[0].image_path);
                        $('#quizQuestionImagePath').val(data[0].image_path);
                    }
                    $('#editQuizQuestion').val(data[0].question);
                    $('#editQuizAnswer1').val(data[0].answer_1);
                    $('#editQuizAnswer2').val(data[0].answer_2);
                    $('#editQuizAnswer3').val(data[0].answer_3);
                    $('#editQuizAnswer4').val(data[0].answer_4);
                    $('#editQuizCorrectAnswer').find('option[value="'+data[0].answer_correct+'"]').attr('selected', 'selected');
                    $('#selectedQuestionID').val(questionID);
                    $('#deleteQuizQuestions').slideUp();
                    $('#createQuizQuestions').slideDown();
                }
                else {
                    $('#editQuizQuestionCategory').find('option[value="'+data[0].category+'"]').attr('selected', 'selected');
                    $('#showQuizPart').show();
                    $('#showQuizCell').hide();
                    $('#editQuizQuestionPart').find('option[value="'+data[0].part_id+'"]').attr('selected', 'selected');
                    if(data[0].image_path == null) {
                        $('#editQuizQuestionType').find('option[value="text"]').attr('selected', 'selected');
                        $('#add-new-question-image').hide();
                    }
                    else {
                        $('#editQuizQuestionType').find('option[value="image"]').attr('selected', 'selected');
                        $('#add-new-question-image').show();
                        $('#question-image-placeholder img').attr('src', '..'+data[0].image_path);
                        $('#quizQuestionImagePath').val(data[0].image_path);
                    }
                    $('#editQuizQuestion').val(data[0].question);
                    $('#editQuizAnswer1').val(data[0].answer_1);
                    $('#editQuizAnswer2').val(data[0].answer_2);
                    $('#editQuizAnswer3').val(data[0].answer_3);
                    $('#editQuizAnswer4').val(data[0].answer_4);
                    $('#editQuizCorrectAnswer').find('option[value="'+data[0].answer_correct+'"]').attr('selected', 'selected');
                    $('#selectedQuestionID').val(questionID);
                    $('#deleteQuizQuestions').slideUp();
                    $('#createQuizQuestions').slideDown();
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.cancelEditQuizQuestion = function() {
        $('#deleteQuizQuestions').slideDown();
        $('#createQuizQuestions').slideUp();
    }

    $scope.handleEditQuizQuestionSubmit = function() {
        var fullPath = document.getElementById('image').value;
        if (fullPath != "") {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var imagePath = fullPath.substring(startIndex);
            if (imagePath.indexOf('\\') === 0 || imagePath.indexOf('/') === 0) {
                imagePath = '/images/quiz/questions/' + imagePath.substring(1);
            }
        }
        else {
            imagePath = $('#quizQuestionImagePath').val();
        }

        if($('#editQuizQuestionType').find('option:selected').val() == 'text') {
            imagePath = null;
        }

        var partID = $('#editQuizQuestionPart').find('option:selected').val();
        var cellID = $('#editQuizQuestionCell').find('option:selected').val();
        var category = $('#editQuizQuestionCategory').find(":selected").val();
        if(category == "part-specific") {
            cellID = null;
        }
        else if(category == "cell-safety") {
            partID = null;
        }

        var quizQuestion = $('#editQuizQuestion').val().trim();
        var quizAnswer1 = $('#editQuizAnswer1').val().trim();
        var quizAnswer2 = $('#editQuizAnswer2').val().trim();
        var quizAnswer3 = $('#editQuizAnswer3').val().trim();
        var quizAnswer4 = $('#editQuizAnswer4').val().trim();
        var correctAnswer = $('#editQuizCorrectAnswer').find('option:selected').val();
        var selectedQuestionID = $('#selectedQuestionID').val();

        if(partID == 1 || cellID == 1) {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Please enter a valid Cell ID or Part ID.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
        else {
            var request = $http({
                method: "post",
                url: "/update_quiz_question",
                data: {
                    part_id: partID,
                    cell_id: cellID,
                    question: quizQuestion,
                    answer_correct: correctAnswer,
                    answer_1: quizAnswer1,
                    answer_2: quizAnswer2,
                    answer_3: quizAnswer3,
                    answer_4: quizAnswer4,
                    category: category,
                    image_path: imagePath,
                    question_id: selectedQuestionID
                }
            })
            .success(function(data) {
                console.log("Success.");
                $scope.questions = [];
                // Get Questions
                $http.post('/get_all_quiz_questions')
                    .success(function(data) {
                        console.log("Success.");
                        $scope.questions = data;

                        $('#editQuizQuestionPart').find('option:first').attr('selected', 'selected');
                        $('#editQuizQuestionCell').find('option:first').attr('selected', 'selected');
                        $('#editQuizQuestion').val('');
                        $('#editQuizAnswer1').val('');
                        $('#editQuizAnswer2').val('');
                        $('#editQuizAnswer3').val('');
                        $('#editQuizAnswer4').val('');
                        $('#editQuizCorrectAnswer').find('option:first').attr('selected', 'selected');
                        $('#question-image-placeholder > img').attr('src', '../images/users/default-user.png');
                        $('#image').replaceWith($('#image').val('').clone(true));

                        $('#deleteQuizQuestions').slideDown();
                        $('#createQuizQuestions').slideUp();
                        $('#app-notifications p').text('Quiz question has been edited successfully.');
                        notificationPopup();

                        setTimeout(function() {
                            $('.viewQuestionInfoButton').on('click', function(event) {
                                event.stopPropagation();
                                $(this).hide();
                                $(this).parent().children('.hideQuestionInfoButton').show();
                                $(this).parent().parent().children('.quizQuestionInfo').slideDown();
                            });

                            $('.hideQuestionInfoButton').on('click', function(event) {
                                event.stopPropagation();
                                $(this).hide();
                                $(this).parent().children('.viewQuestionInfoButton').show();
                                $(this).parent().parent().children('.quizQuestionInfo').slideUp();
                            });

                            $('.quizQuestionTitle').on('click', function() {
                                if ($(this).children('.viewQuestionInfoButton').is(':visible')) {
                                    $(this).children('.viewQuestionInfoButton').hide();
                                    $(this).children('.hideQuestionInfoButton').show();
                                    $(this).parent().children('.quizQuestionInfo').slideDown();
                                }
                                else {
                                    $(this).children('.viewQuestionInfoButton').show();
                                    $(this).children('.hideQuestionInfoButton').hide();
                                    $(this).parent().children('.quizQuestionInfo').slideUp();
                                }
                            });
                        }, 250);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    }
}

/* =======================================================================
    HUTCHINSON[3.10] - DASHBOARD CONTROLLER
    - Get data from the database
    - Set Angular variables to be used for display data.
    - Functions to control actions of the schedule page.
========================================================================== */
function dashboardController($scope, $http) {
    // DEFINE OBJECTS
    // ===================================================================
    $scope.cellStatus = {};
    $scope.goodPartCounter = {};
    $scope.pphPercentage = {};
    $scope.pph = {};
    $scope.pphGoal = {};
    $scope.badPartCounter = {};
    $scope.scrapPercentage = {};
    $scope.runningPart = {};
    $scope.runningCell = {};
    $scope.user = {};
    var myPieChart;
    var goodParts = 0.000000001;
    var badParts = 0.000000001;

    // DEFINE MAP VARIABLES
    var mapWidth = 845;
    var mapHeight = 664;
    var dataMapWidth = 5988;
    var dataMapHeight = 3972;
    var dataMapCenterX = 925;
    var dataMapCenterY = 2848;

    // INITIALZE DATA ON PAGE
    // ===================================================================
    setTimeout(function() {
        var ctx = document.getElementById("goodBadChart").getContext("2d");
        var ctxOptions = {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke : true,

            //String - The colour of each segment stroke
            segmentStrokeColor : "#000",

            //Number - The width of each segment stroke
            segmentStrokeWidth : 2,

            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout : 0, // This is 0 for Pie charts

            //Number - Amount of animation steps
            animationSteps : 100,

            //String - Animation easing effect
            animationEasing : "easeOutBounce",

            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate : true,

            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale : false,

            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        }
        var ctxData = [
            {
                value: badParts,
                color: "#e12029",
                highlight: "#e12029",
                label: "Bad Parts Counter"
            },
            {
                value: goodParts,
                color:"#50BD12",
                highlight: "#50BD12",
                label: "Good Parts Counter"
            }
        ];
        myPieChart = new Chart(ctx).Pie(ctxData,ctxOptions);
        console.log(myPieChart);
    }, 250);

    var request = $http({
        method: "post",
        url: "/get_cells_with_status",
        data: {
        }
    })
    .success(function(data) {
        for(var i = 0; i < data.length; i++) {
            var state = parseInt(data[i].value);
            if (state === 1) {
                $('.'+(data[i].cell_name).toLowerCase()).css('border-color', 'rgba(108,216,78,1)').addClass('hasState');
            }
            else if (state === 2) {
                $('.'+(data[i].cell_name).toLowerCase()).css('border-color', 'rgba(2,116,165,1)').addClass('hasState');
            }
            else if (state === 3) {
                $('.'+(data[i].cell_name).toLowerCase()).css('border-color', 'rgba(255,209,1,1)').addClass('hasState');
            }
            else if (state === 4) {
                $('.'+(data[i].cell_name).toLowerCase()).css('border-color', 'rgba(221,0,42,1)').addClass('hasState');
            }
        }
    })
    .error(function(data){
        console.log('Error: ' + data);
    });
    var request = $http({
        method: "post",
        url: "/get_agv_positions",
        data: {
        }
    })
    .success(function(data) {
        var dataX;
        var dataY;
        for(var i = 0; i < data.length; i++) {
          if ( data[i].x_pos == 0 && data[i].y_pos == 0 ) {
            if(data[i].vehicle == 1) {
                $('.agv-wrap .brown').fadeOut(300);
            }
            else if(data[i].vehicle == 2) {
                $('.agv-wrap .magoo').fadeOut(300);
            }
            else if(data[i].vehicle == 3) {
                $('.agv-wrap .fudd').fadeOut(300);
            }
          }
          else {
            dataX = dataMapCenterX + data[i].x_pos;
            dataY = dataMapCenterY - data[i].y_pos;
            // Find Data Map Position Percentage
            var mapPositionX = (dataX / dataMapWidth) * mapWidth;
            var mapPositionY = (dataY / dataMapHeight) * mapHeight;
            if(data[i].vehicle == 1) {
                $('.agv-wrap .brown').animate({
                    left: mapPositionX+"px",
                    top: mapPositionY+"px"
                });
            }
            else if(data[i].vehicle == 2) {
                $('.agv-wrap .magoo').animate({
                    left: mapPositionX+"px",
                    top: mapPositionY+"px"
                });
            }
            else if(data[i].vehicle == 3) {
                $('.agv-wrap .fudd').animate({
                    left: mapPositionX+"px",
                    top: mapPositionY+"px"
                });
            }
          }
        }
    })
    .error(function(data){
        console.log('Error: ' + data);
    });

    plantOverviewInterval = setInterval(function() {
      var request = $http({
          method: "post",
          url: "/get_cells_with_status",
          data: {
          }
      })
      .success(function(data) {
          for(var i = 0; i < data.length; i++) {
              var state = parseInt(data[i].value);
              if (state === 1) {
                  $('.'+(data[i].cell_name).toLowerCase()).css('border-color', 'rgba(108,216,78,1)').addClass('hasState');
              }
              else if (state === 2) {
                  $('.'+(data[i].cell_name).toLowerCase()).css('border-color', 'rgba(2,116,165,1)').addClass('hasState');
              }
              else if (state === 3) {
                  $('.'+(data[i].cell_name).toLowerCase()).css('border-color', 'rgba(255,209,1,1)').addClass('hasState');
              }
              else if (state === 4) {
                  $('.'+(data[i].cell_name).toLowerCase()).css('border-color', 'rgba(221,0,42,1)').addClass('hasState');
              }
          }
      })
      .error(function(data){
          console.log('Error: ' + data);
      });
      var request = $http({
          method: "post",
          url: "/get_agv_positions",
          data: {
          }
      })
      .success(function(data) {
          var dataX;
          var dataY;
          for(var i = 0; i < data.length; i++) {
            if ( data[i].x_pos == 0 && data[i].y_pos == 0 ) {
                if(data[i].vehicle == 1) {
                    $('.agv-wrap .brown').fadeOut(300);
                }
                else if(data[i].vehicle == 2) {
                    $('.agv-wrap .magoo').fadeOut(300);
                }
                else if(data[i].vehicle == 3) {
                    $('.agv-wrap .fudd').fadeOut(300);
                }
            }
            else {
                dataX = dataMapCenterX + data[i].x_pos;
                dataY = dataMapCenterY - data[i].y_pos;
                // Find Data Map Position Percentage
                var mapPositionX = (dataX / dataMapWidth) * mapWidth;
                var mapPositionY = (dataY / dataMapHeight) * mapHeight;
                if(data[i].vehicle == 1) {
                    $('.agv-wrap .brown').fadeIn(300);
                    $('.agv-wrap .brown').animate({
                        left: mapPositionX+"px",
                        top: mapPositionY+"px"
                    });
                }
                else if(data[i].vehicle == 2) {
                    $('.agv-wrap .magoo').fadeIn(300);
                    $('.agv-wrap .magoo').animate({
                        left: mapPositionX+"px",
                        top: mapPositionY+"px"
                    });
                }
                else if(data[i].vehicle == 3) {
                    $('.agv-wrap .fudd').fadeIn(300);
                    $('.agv-wrap .fudd').animate({
                        left: mapPositionX+"px",
                        top: mapPositionY+"px"
                    });
                }
            }
          }
      })
      .error(function(data){
          console.log('Error: ' + data);
      });
  }, 5000);

    // FUNCTIONS
    // ===================================================================
    $scope.closeCellData = function() {
        if($('.plant_info_wrap').css('right') == '0px') {
            $('.plant_info_wrap').animate({
                right: '-401px'
            });
        }
    }

    $scope.showCellData = function(cellName) {
        $scope.cellStatus = {};
        $scope.goodPartCounter = {};
        $scope.pphPercentage = {};
        $scope.pph = {};
        $scope.pphGoal = {};
        $scope.badPartCounter = {};
        $scope.scrapPercentage = {};
        $scope.runningPart = {};
        $scope.runningCell = cellName;
        $scope.user = {};
        var goodParts = 0.000000001;
        var badParts = 0.000000001;

        if($('.plant_info_wrap').css('right') != '0px') {
            $('.plant_info_wrap').animate({
                right: '0px'
            });
        }

        // Get Cell Status
        var request = $http({
            method: "post",
            url: "/cell_status_in_dashboard",
            data: {
                cell_name: cellName
            }
        })
        .success(function(data) {
            for(var i=0; i < data.length; i++) {                    // Split data up into their own Angular variables
                if(data[i].label === 'cell_status') {
                    var state = parseInt(data[i].value);
                    if (state === 1) {
                        $scope.cellStatus = "Running";
                    }
                    else if (state === 2) {
                        $scope.cellStatus = "Idle";
                    }
                    else if (state === 3) {
                        $scope.cellStatus = "System Alert";
                    }
                    else if (state === 4) {
                        $scope.cellStatus = "System Down!";
                    }
		    else if (state === 5) {
			$scope.cellStatus = "System Starved!";
			$('.statusContainer').css('border-color', 'rgba(205, 117, 29, 1)');
		    }
                }
                else if(data[i].label === 'good_part_counter') {
                    if(data[i].value == 0) {
                        goodParts = 0.000000001;
                    }
                    else {
                        goodParts = data[i].value;
                    }
                    $scope.goodPartCounter = data[i].value;
                }
                else if (data[i].label === 'pph_percentage') {
                    $scope.pphPercentage = Math.round(data[i].value * 10) / 10;
                    $('.pphContainer .barComplete').css('width', $scope.pphPercentage+'%');
                    if($scope.pphPercentage < 85) {
                        $('.pphContainer .barComplete').addClass('barCompleteBadValue');
                    }
                    else {
                        $('.pphContainer .barComplete').removeClass('barCompleteBadValue');
                    }
                }
                else if (data[i].label === 'pph') {
                    $scope.pph = Math.round(data[i].value);
                }
                else if (data[i].label === 'pph_goal') {
                    $scope.pphGoal = Math.round(data[i].value);
                }
                else if (data[i].label === 'bad_part_counter') {
                    if(data[i].value == 0) {
                        badParts = 0.000000001;
                    }
                    else {
                        badParts = data[i].value;
                    }
                    $scope.badPartCounter = data[i].value;
                }
                else if (data[i].label === 'scrap_percentage') {
                    $scope.scrapPercentage = Math.round(data[i].value * 10) / 10;
                    $('.scrapContainer .barComplete').css('width', $scope.scrapPercentage*10+'%');
                    if($scope.scrapPercentage > 1) {
                        $('.scrapContainer .barComplete').addClass('barCompleteBadValue');
                    }
                    else {
                        $('.scrapContainer .barComplete').removeClass('barCompleteBadValue');
                    }
                }
                else if (data[i].label === 'running_part') {
                    $scope.runningPart = (data[i].value).substring(0, 8);
                }
            }
            myPieChart.segments[0].value = badParts;
            myPieChart.segments[1].value = goodParts;
            myPieChart.update();
        })
        .error(function(data){
            console.log('Error: ' + data);
        });

        // Graph
        $('.historyHoursContainer .hoursContainer .hoursGraph .interval').remove();
        var hours = [];

        var currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 1);
        var pastDayEnd = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + " " + currentDate.getHours() + ":59:59";
        var pastDate = new Date();
        pastDate.setHours(pastDate.getHours() - 24);
        var pastDayStart = pastDate.getFullYear() + "-" + (pastDate.getMonth() + 1) + "-" + pastDate.getDate() + " " + pastDate.getHours() + ":00:00";

        var request = $http({
            method: "post",
            url: "/get_hour_graph_data_cell_name",
            data: {
                past_day_start: pastDayStart,
                past_day_end: pastDayEnd,
                cell_name: cellName
            }
        })
        .success(function(data) {
            hourBarLeft = 0;
            var maxHourHeight = 200;
            for ( var i = 23; i >= 0; i-- ) {
                var found = false;
                var iHoursAgo = currentDate.getHours() - i;
                if ( iHoursAgo < 0 ) {
                    iHoursAgo = 24 + iHoursAgo;
                }
                for ( var j = 0; j < data.length; j++ ) {
                    if ( ( data[j].hour == iHoursAgo ) && !found ) {
                        hours.push({
                            hour: iHoursAgo,
                            total: data[j].count
                        });
                        found = true;
                    }
                }
                if ( !found ) {
                    hours.push({
                        hour: iHoursAgo,
                        total: 0
                    });
                }
            }
            // Add hour bars that include data.
            for ( var i = 0; i < hours.length; i++ ) {
                // If the data is less than the max height, calculate the percentage
                if(hours[i].total < maxHourHeight) {
                    var height = ( hours[i].total / maxHourHeight ) * 100;
                    $('<span class="interval" style="height:0%; left:'+hourBarLeft+'px;"></span>').appendTo('.hoursContainer .hoursGraph').animate({
                       height: height+"%"
                    }, 3000);
                    hourBarLeft += 14;
                }
                // If the data is more or equal to the max, set it to 100%
                else {
                    $('<span class="interval" style="height:0%; left:'+hourBarLeft+'px;"></span>').appendTo('.hoursContainer .hoursGraph').animate({
                       height: "100%"
                    }, 3000);
                    hourBarLeft += 14;
                }
            }
        })
        .error(function(data){
            console.log('Error: ' + data);
        });
    }
}

/* =======================================================================
    HUTCHINSON[3.11] - ADMIN LOGIN CONTROLLER
    - Get data from the database
    - Set Angular variables to be used for display data.
    - Functions to control actions of the schedule page.
========================================================================== */
function adminLoginController($scope, $http, $location) {
    // DEFINE OBJECTS
    // ===================================================================
    $scope.adminUser = {};

    // INITIALZE DATA ON PAGE
    // ===================================================================

    // FUNCTIONS
    // ===================================================================
    $scope.handleLoginForm = function() {
        var username = $('#username').val().trim();
        var password = $('#password').val().trim();
        password = md5(password);
        var dbPassword = '';

        if (!username || !password) {
            // Error Message
            $('.admin-login-form .error').text("Please enter a Username and Password.").show();
        }
        else {
            $('.admin-login-form button').removeClass('invalid');
            // Get information from database based on username
            var request = $http({
                    method: "post",
                    url: "/get_admin_login",
                    data: {
                        username: username
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                    if(typeof data[0] !== 'undefined') {
                        $scope.adminUser = data[0];
                        dbPassword = $scope.adminUser.password;

                        // Check password
                        if (dbPassword != password) {
                            // Error Message
                            $scope.adminUser = {};
                            $('.admin-login-form button').addClass('invalid');
                            $('.admin-login-form .error').text("This password does not match the one on file.").show();
                        }
                        else {
                            // Save user to global variable
                            authenticated_users.admin = $scope.adminUser;
                            var request = $http({
                                method: "post",
                                url: "/get_admin_roles",
                                data: {
                                    user_id: authenticated_users.admin.id
                                }
                            })
                            .success(function(data) {
                                console.log("Success.");
                                if (typeof data[0] !== 'undefined') {
                                    admin_roles = data[0];
                                    if (admin_roles.cell_schedule == 1) {
                                        $('.menu-item-cell-schedule').show();
                                    }
                                    else {
                                        $('.menu-item-cell-schedule').hide();
                                    }
                                    if (admin_roles.quality_alerts == 1) {
                                        $('.menu-item-quality-alerts').show();
                                    }
                                    else {
                                        $('.menu-item-quality-alerts').hide();
                                    }
                                    if (admin_roles.quiz_management == 1) {
                                        $('.menu-item-quiz-management').show();
                                    }
                                    else {
                                        $('.menu-item-quiz-management').hide();
                                    }
                                    if (admin_roles.part_management == 1) {
                                        $('.menu-item-part-management').show();
                                    }
                                    else {
                                        $('.menu-item-part-management').hide();
                                    }
                                    if (admin_roles.work_instructions == 1) {
                                        $('.menu-item-work-instructions').show();
                                    }
                                    else {
                                        $('.menu-item-work-instructions').hide();
                                    }
                                    if (admin_roles.user_management == 1) {
                                        $('.menu-item-user-management').show();
                                    }
                                    else {
                                        $('.menu-item-user-management').hide();
                                    }
									                  if (admin_roles.tech_process_verification == 1) {
                                        $('.menu-item-tech-process-verification').show();
                                    }
                                    else {
                                        $('.menu-item-tech-process-verification').hide();
                                    }
                                    if (admin_roles.operator_process_verification == 1) {
                                        $('.menu-item-operator-process-verification').show();
                                    }
                                    else {
                                        $('.menu-item-operator-process-verification').hide();
                                    }
                                    if (admin_roles.historian_data == 1) {
                                        $('.menu-item-historian-data').show();
                                    }
                                    else {
                                        $('.menu-item-historian-data').hide();
                                    }
                                    if (admin_roles.boundary_samples == 1) {
                                        $('.menu-item-boundary-samples').show();
                                    }
                                    else {
                                        $('.menu-item-boundary-samples').hide();
                                    }
                                    if (admin_roles.downtime == 1) {
                                        $('.menu-item-downtime').show();
                                    }
                                    else {
                                      $('.menu-item-downtime').hide();
                                    }
                                }
                                else {
                                    admin_roles = false;
                                    $('.menu-item-cell-schedule').hide();
                                    $('.menu-item-quality-alerts').hide();
                                    $('.menu-item-quiz-management').hide();
                                    $('.menu-item-part-management').hide();
                                    $('.menu-item-work-instructions').hide();
                                    $('.menu-item-user-management').hide();
									                  $('.menu-item-tech-process-verification').hide();
                                    $('.menu-item-operator-process-verification').hide();
                                    $('.menu-item-historian-data').hide();
                                    $('.menu-item-boundary-samples').hide();
                                    $('.menu-item-downtime').hide();
                                }
                            })
                            .error(function(data) {
                                console.log('Error: ' + data);
                            });
                            // Login User
                            $location.path("admin/admin-dashboard.html");
                        }
                    }
                    else {
                        $('.admin-login-form button').addClass('invalid');
                        $('.admin-login-form .error').text("User not found.").show();
                    }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    }
}

/* =======================================================================
    HUTCHINSON[3.12] - QUALITY ALERTS CONTROLLER
    - Get data from the database
    - Set Angular variables to be used for display data.
    - Functions to control actions of the schedule page.
========================================================================== */
function adminQualityAlertsController($scope, $http, $location, $upload) {
    // DEFINE OBJECTS
    // ===================================================================
    $scope.parts = {};
    $scope.cellInfo = {};
    $scope.qualityAlerts = [];

    // INITIALZE DATA ON PAGE
    // ===================================================================
    // Initalize DateTimePicker - format: 0000-00-00 00:00:00
    $('#quality-alert-end-datetime').datetimepicker({
        format: 'Y-m-d H:i'
    });

    $('#quality-alert-edit-datetime').datetimepicker({
        format: 'Y-m-d H:i'
    });

    // Parts
    $http.post('/get_parent_part')
        .success(function(data) {
            $scope.parts = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Cell
    $http.post('/get_cells')
        .success(function(data) {
            $scope.cellInfo = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Quality Alerts
    $http.post('/get_quality_alerts')
        .success(function(data) {
            for(var i = 0; i < data.length; i++) {
              // 0000-00-00 00:00:00
              var readableDate = new Date(data[i].expires);
              data[i].expires = readableDate.getFullYear() + "-" + (readableDate.getMonth() + 1) + "-" + readableDate.getDate() + " " + readableDate.getHours() + ":" + readableDate.getMinutes() + ":" + readableDate.getSeconds();
            }
            $scope.qualityAlerts = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // FUNCTIONS
    // ===================================================================
    // Refresh Quality Alerts
    $scope.getQualityAlerts = function() {
        $scope.qualityAlerts = [];
        $http.post('/get_quality_alerts')
            .success(function(data) {
                for(var i = 0; i < data.length; i++) {
                  // 0000-00-00 00:00:00
                  var readableDate = new Date(data[i].expires);
                  data[i].expires = readableDate.getFullYear() + "-" + (readableDate.getMonth() + 1) + "-" + readableDate.getDate() + " " + readableDate.getHours() + ":" + readableDate.getMinutes() + ":" + readableDate.getSeconds();
                }
                $scope.qualityAlerts = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.upload = function (files) {
        if (files && files.length) {

            var reader = new FileReader();
            reader.onload = function (e) {
                $('#quality-alert-placeholder > img').attr('src', e.target.result);
            }
            reader.readAsDataURL(files[0]);

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: '/quality_alert_image_upload',
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
                });
            }
        }
    }

    $scope.handleQualityAlertSubmit = function() {
        var fullPath = document.getElementById('image').value;
        if (fullPath != "") {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var imagePath = fullPath.substring(startIndex);
            if (imagePath.indexOf('\\') === 0 || imagePath.indexOf('/') === 0) {
                imagePath = '/images/quality-alerts/' + imagePath.substring(1);
            }
        }
        else {
            imagePath = '/images/quality-alerts/default-user.png';
        }

        var cellID = $('#quality-alert-cell').find('option:selected').val();
        var partID = $('#quality-alert-part').find('option:selected').val();
        var description = $('#quality-alert-text').val().trim();
        var datetime = $('#quality-alert-end-datetime').val().trim();

        if (cellID == 1 || partID == 1) {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Please select a valid Cell ID and Part ID.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
        else {
            var request = $http({
                method: "post",
                url: "/add_quality_alert",
                data: {
                    cell_id: cellID,
                    part_id: partID,
                    description: description,
                    expires: datetime,
                    image_path: imagePath
                }
            })
            .success(function(data) {
                console.log("Success.");
                $('#quality-alert-cell').find('option:first').attr('selected', 'selected');
                $('#quality-alert-part').find('option:first').attr('selected', 'selected');
                $('#quality-alert-end-datetime').val('');
                $('#quality-alert-text').val('');
                $('#quality-alert-placeholder > img').attr('src', '../images/users/default-user.png');
                $('#image').replaceWith($('#image').val('').clone(true));
                $scope.getQualityAlerts();
                $('#app-notifications p').text('Quality Alert has been added successfully.');
                notificationPopup();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    }

    $scope.deleteQualityAlert = function(alertID) {
        var confirm = window.confirm("Are you sure you want to delete this quality alert?");
        if (confirm == true) {
            var request = $http({
                    method: "post",
                    url: "/delete_quality_alert",
                    data: {
                        alert_id: alertID
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                    $scope.getQualityAlerts();
                    $('#app-notifications p').text('Quality Alert has been deleted successfully.');
                    notificationPopup();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    }

    $scope.editQualityAlert = function(alertID) {
        var request = $http({
                method: "post",
                url: "/get_quality_alert_by_id",
                data: {
                    alert_id: alertID
                }
            })
            .success(function(data) {
                console.log("Success.");
                var readableDate = new Date(data[0].expires);
                data[0].expires = readableDate.getFullYear() + "-" + (readableDate.getMonth() + 1) + "-" + readableDate.getDate() + " " + readableDate.getHours() + ":" + readableDate.getMinutes() + ":" + readableDate.getSeconds();
                $('#quality-alert-edit-cell').find('option[value="'+data[0].cell_id+'"]').attr('selected', 'selected');
                $('#quality-alert-edit-part').find('option[value="'+data[0].part_id+'"]').attr('selected', 'selected');
                $('#quality-alert-edit-datetime').val(data[0].expires);
                $('#quality-alert-edit-text').text(data[0].description);
                $('#quality-alert-edit-image').attr('src', '..'+data[0].image_path);
                $('#quality-alert-id').attr('value', alertID);
                $('#quality-alert-original-image').attr('value', data[0].image_path);
                $('#delete-quality-alerts').slideUp();
                $('.editQualityAlertRow').slideDown();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.cancelEditQualityAlert = function() {
        $('.editQualityAlertRow').slideUp();
        $('#delete-quality-alerts').slideDown();
    }

    $scope.saveQualityAlert = function() {
        var fullPath = document.getElementById('image').value;
        if (fullPath != "") {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var imagePath = fullPath.substring(startIndex);
            if (imagePath.indexOf('\\') === 0 || imagePath.indexOf('/') === 0) {
                imagePath = '/images/quality-alerts/' + imagePath.substring(1);
            }
        }
        else {
            imagePath = $('#quality-alert-original-image').val();
        }

        var cellID = $('#quality-alert-edit-cell').find('option:selected').val();
        var partID = $('#quality-alert-edit-part').find('option:selected').val();
        var expires = $('#quality-alert-edit-datetime').val().trim();
        var description = $('#quality-alert-edit-text').val().trim();
        var alertID = $('#quality-alert-id').val();

        if(cellID == 1 || partID == 1) {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Please select a valid Cell ID and Part ID.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
        else {
            var request = $http({
                method: "post",
                url: "/update_quality_alert",
                data: {
                    alert_id: alertID,
                    cell_id: cellID,
                    part_id: partID,
                    expires: expires,
                    description: description,
                    image_path: imagePath
                }
            })
            .success(function(data) {
                console.log("Success.");
                $('.editQualityAlertRow').slideUp();
                $('#delete-quality-alerts').slideDown();
                $scope.getQualityAlerts();
                $('#app-notifications p').text('Quality Alert has been updated successfully.');
                notificationPopup();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    }
}

/* =======================================================================
    HUTCHINSON[3.13] - WORK INSTRUCTION CONTROLLER
    - Get data from the database
    - Set Angular variables to be used for display data.
    - Functions to control actions of the schedule page.
========================================================================== */
function workInstructionsController($scope, $http, $upload) {
    // DEFINE OBJECTS
    // ===================================================================
    $scope.cells = {};
    $scope.parts = {};
    $scope.images = {};
    var oldDisplayOrderIDs = [];

    // INITIALZE DATA ON PAGE
    // ===================================================================
    // Parts
    $http.post('/get_cells')
        .success(function(data) {
            $scope.cells = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Parts
    $http.post('/get_parent_part')
        .success(function(data) {
            $scope.parts = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    setTimeout(function() {
        $('#workCell').on('change', function() {
            if($('#workCell').find('option:selected').val() == '---') {
                $('.selectPartContainer').hide();
                $('#workPart').find('option:first').attr('selected', 'selected');
                $('.fileUploadContainer').hide();
                $('.fileListContainer').hide();
            }
            else {
                $('.selectPartContainer').show();
            }
        });

        $('#workPart').on('change', function() {
            if($('#workPart').find('option:selected').val() == '---') {
                $('.fileUploadContainer').hide();
            }
            else {
                $('.fileUploadContainer').show();
                var cellName = $('#workCell').find('option:selected').val();
                var partName = $('#workPart').find('option:selected').val();
                var request = $http({
                    method: "post",
                    url: "/get_current_images",
                    data: {
                        cell_name: cellName,
                        part_name: partName
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                    if(data.length > 0) {
                        $('.filesContainer .empty-notification').remove();
                        $scope.images = data;
                    }
                    else {
                        $('.filesContainer .empty-notification').remove();
                        $scope.images = {};
                        $('.filesContainer').append('<span class="empty-notification">No Images Found!</span>')
                    }
                    $('.filesContainer').sortable();
                    $('.filesContainer').disableSelection();
                    $('.filesContainer').on('sortupdate', function( event, ui ) {
                        oldDisplayOrderIDs = $('.filesContainer').sortable("toArray");
                        for(var i = 0; i < oldDisplayOrderIDs.length; i++) {
                            var request = $http({
                                method: "post",
                                url: "/update_work_instruction_order",
                                data: {
                                    new_display_order: i,
                                    image_id: parseInt(oldDisplayOrderIDs[i])
                                }
                            })
                            .success(function(data) {
                                console.log("Success.");
                            })
                            .error(function(data) {
                                console.log('Error: ' + data);
                            });
                        }
                    });
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
                $('.fileListContainer').show();
            }
        });
    }, 250);

    // FUNCTIONS
    // ===================================================================
    $scope.deleteImage = function(imageID) {
        var request = $http({
            method: "post",
            url: "/delete_work_instruction_image",
            data: {
                image_id: imageID
            }
        })
        .success(function(data) {
            console.log("Success.");
            var cellName = $('#workCell').find('option:selected').val();
            var partName = $('#workPart').find('option:selected').val();
            var request = $http({
                method: "post",
                url: "/get_current_images",
                data: {
                    cell_name: cellName,
                    part_name: partName
                }
            })
            .success(function(data) {
                console.log("Success.");
                if(data.length > 0) {
                    $('.filesContainer .empty-notification').remove();
                    $scope.images = data;
                    $('.filesContainer').sortable();
                    $('.filesContainer').disableSelection();
                    oldDisplayOrderIDs = $('.filesContainer').sortable("toArray");
                    for(var i = 0; i < $scope.images.length; i++) {
                        var request = $http({
                            method: "post",
                            url: "/update_work_instruction_order",
                            data: {
                                new_display_order: i,
                                image_id: parseInt($scope.images[i].id)
                            }
                        })
                        .success(function(data) {
                            console.log("Success.");
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                    }
                }
                else {
                    $('.filesContainer .empty-notification').remove();
                    $scope.images = {};
                    $('.filesContainer').append('<span class="empty-notification">No Images Found!</span>')
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }

    $scope.$watch('files', function() {
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
        var cellName = $('#workCell').find('option:selected').val();
        var partName = $('#workPart').find('option:selected').val();
        var displayOrder;
        var imageUploadedCount = 0;
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: '/work_instruction_image_upload',
                    file: file,
                    fields: {cell: cellName, part: partName}
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    if($('.filesContainer .uploading-notification').length <= 0) {
                        $('.filesContainer').append('<span class="uploading-notification"><img src="/images/ajax-loader.gif" alt="Uploading..."></span>');
                    }
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + ' uploaded. Response: ' + JSON.stringify(data));
                    imageUploadedCount++;
                    if(imageUploadedCount == files.length) {
                        var request = $http({
                            method: "post",
                            url: "/get_current_images",
                            data: {
                                cell_name: cellName,
                                part_name: partName
                            }
                        })
                        .success(function(data) {
                            console.log("Success.");
                            if(data.length > 0) {
                                $('.filesContainer .uploading-notification').remove();
                                $('.filesContainer .empty-notification').remove();
                                $scope.images = data;
                                $('.filesContainer').sortable();
                                $('.filesContainer').disableSelection();
                            }
                            else {
                                $('.filesContainer .uploading-notification').remove();
                                $('.filesContainer .empty-notification').remove();
                                $scope.images = {};
                                $('.filesContainer').append('<span class="empty-notification">No Images Found!</span>')
                            }
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                    }
                });
                if($scope.images.length > 0) {
                    displayOrder = i + $scope.images.length;
                }
                else {
                    displayOrder = i;
                }
                var request = $http({
                    method: "post",
                    url: "/add_work_instruction",
                    data: {
                        cell_name: cellName,
                        part_name: partName,
                        image_path: '/images/training/'+cellName+'/'+partName+'/'+file.name,
                        display_order: displayOrder
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            }
        }
    }
}

/* =======================================================================
    HUTCHINSON[3.13] - BOUNDARY SAMPLES CONTROLLER
    - Get data from the database
    - Set Angular variables to be used for display data.
    - Functions to control actions of the schedule page.
========================================================================== */
function boundarySamplesController($scope, $http, $upload) {
    // DEFINE OBJECTS
    // ===================================================================
    $scope.cells = {};
    $scope.parts = {};
    $scope.images = {};
    var oldDisplayOrderIDs = [];

    // INITIALZE DATA ON PAGE
    // ===================================================================
    // Parts
    $http.post('/get_cells')
        .success(function(data) {
            $scope.cells = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Parts
    $http.post('/get_parent_part')
        .success(function(data) {
            $scope.parts = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    setTimeout(function() {
        $('#workCell').on('change', function() {
            if($('#workCell').find('option:selected').val() == '---') {
                $('.selectPartContainer').hide();
                $('#workPart').find('option:first').attr('selected', 'selected');
                $('.fileUploadContainer').hide();
                $('.fileListContainer').hide();
            }
            else {
                $('.selectPartContainer').show();
            }
        });

        $('#workPart').on('change', function() {
            if($('#workPart').find('option:selected').val() == '---') {
                $('.fileUploadContainer').hide();
            }
            else {
                $('.fileUploadContainer').show();
                var cellName = $('#workCell').find('option:selected').val();
                var partName = $('#workPart').find('option:selected').val();
                var request = $http({
                    method: "post",
                    url: "/get_current_boundary_sample_images",
                    data: {
                        cell_name: cellName,
                        part_name: partName
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                    if(data.length > 0) {
                        $('.filesContainer .empty-notification').remove();
                        $scope.images = data;
                    }
                    else {
                        $('.filesContainer .empty-notification').remove();
                        $scope.images = {};
                        $('.filesContainer').append('<span class="empty-notification">No Images Found!</span>')
                    }
                    $('.filesContainer').sortable();
                    $('.filesContainer').disableSelection();
                    $('.filesContainer').on('sortupdate', function( event, ui ) {
                        oldDisplayOrderIDs = $('.filesContainer').sortable("toArray");
                        for(var i = 0; i < oldDisplayOrderIDs.length; i++) {
                            var request = $http({
                                method: "post",
                                url: "/update_boundary_sample_order",
                                data: {
                                    new_display_order: i,
                                    image_id: parseInt(oldDisplayOrderIDs[i])
                                }
                            })
                            .success(function(data) {
                                console.log("Success.");
                            })
                            .error(function(data) {
                                console.log('Error: ' + data);
                            });
                        }
                    });
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
                $('.fileListContainer').show();
            }
        });
    }, 250);

    // FUNCTIONS
    // ===================================================================
    $scope.deleteImage = function(imageID) {
        var request = $http({
            method: "post",
            url: "/delete_boundary_sample_image",
            data: {
                image_id: imageID
            }
        })
        .success(function(data) {
            console.log("Success.");
            var cellName = $('#workCell').find('option:selected').val();
            var partName = $('#workPart').find('option:selected').val();
            var request = $http({
                method: "post",
                url: "/get_current_boundary_sample_images",
                data: {
                    cell_name: cellName,
                    part_name: partName
                }
            })
            .success(function(data) {
                console.log("Success.");
                if(data.length > 0) {
                    $('.filesContainer .empty-notification').remove();
                    $scope.images = data;
                    $('.filesContainer').sortable();
                    $('.filesContainer').disableSelection();
                    oldDisplayOrderIDs = $('.filesContainer').sortable("toArray");
                    for(var i = 0; i < $scope.images.length; i++) {
                        var request = $http({
                            method: "post",
                            url: "/update_boundary_sample_order",
                            data: {
                                new_display_order: i,
                                image_id: parseInt($scope.images[i].id)
                            }
                        })
                        .success(function(data) {
                            console.log("Success.");
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                    }
                }
                else {
                    $('.filesContainer .empty-notification').remove();
                    $scope.images = {};
                    $('.filesContainer').append('<span class="empty-notification">No Images Found!</span>')
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }

    $scope.$watch('files', function() {
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
        var cellName = $('#workCell').find('option:selected').val();
        var partName = $('#workPart').find('option:selected').val();
        var displayOrder;
        var imageUploadedCount = 0;
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: '/boundary_sample_image_upload',
                    file: file,
                    fields: {cell: cellName, part: partName}
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    if($('.filesContainer .uploading-notification').length <= 0) {
                        $('.filesContainer').append('<span class="uploading-notification"><img src="/images/ajax-loader.gif" alt="Uploading..."></span>');
                    }
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + ' uploaded. Response: ' + JSON.stringify(data));
                    imageUploadedCount++;
                    if(imageUploadedCount == files.length) {
                        var request = $http({
                            method: "post",
                            url: "/get_current_boundary_sample_images",
                            data: {
                                cell_name: cellName,
                                part_name: partName
                            }
                        })
                        .success(function(data) {
                            console.log("Success.");
                            if(data.length > 0) {
                                $('.filesContainer .uploading-notification').remove();
                                $('.filesContainer .empty-notification').remove();
                                $scope.images = data;
                                $('.filesContainer').sortable();
                                $('.filesContainer').disableSelection();
                            }
                            else {
                                $('.filesContainer .uploading-notification').remove();
                                $('.filesContainer .empty-notification').remove();
                                $scope.images = {};
                                $('.filesContainer').append('<span class="empty-notification">No Images Found!</span>')
                            }
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                    }
                });
                if($scope.images.length > 0) {
                    displayOrder = i + $scope.images.length;
                }
                else {
                    displayOrder = i;
                }
                var request = $http({
                    method: "post",
                    url: "/add_boundary_sample",
                    data: {
                        cell_name: cellName,
                        part_name: partName,
                        image_path: '/images/boundary-samples/'+cellName+'/'+partName+'/'+file.name,
                        display_order: displayOrder
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            }
        }
    }
}

/* =======================================================================
    HUTCHINSON[3.14] - TECH PROCESS VERIFICATION CONTROLLER
    - Get data from the database
    - Set Angular variables to be used for display data.
    - Functions to control actions of the schedule page.
========================================================================== */
function techProcessVerificationController($scope, $http) {
    // DEFINE OBJECTS
    // ===================================================================
    $scope.cells = {};
    $scope.parts = {};
    $scope.processes = [];
    var oldDisplayOrderIDs = [];
    var showCopy = false;

    // INITIALZE DATA ON PAGE
    // ===================================================================
    // Cells
    $http.post('/get_cells')
        .success(function(data) {
            $scope.cells = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Parts
    $http.post('/get_parent_part')
        .success(function(data) {
            $scope.parts = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    setTimeout(function() {
        $('#processCell').on('change', function() {
            if($('#processCell').find('option:selected').val() == 1) {
                $('#processPart').find('option:first').attr('selected', 'selected');
                // TODO --------------------------------------------
                // Hide containers
                $('.selectPartContainer').hide();
                $('.selectTypeContainer').hide();
            }
            else {
                $('.selectPartContainer').show();
            }
        });

        $('#processPart').on('change', function() {
            if($('#processPart').find('option:selected').val() == 1) {
                ('#processType').find('option:first').attr('selected', 'selected');
                // TODO --------------------------------------------
                // Hide containers
                $('.processVerificationContainer').hide();
            }
            else {
                var cellID = $('#processCell').find('option:selected').val();
                var partID = $('#processPart').find('option:selected').val();

                var request = $http({
                    method: "post",
                    url: "/get_process_verification",
                    data: {
                        cell_id: cellID,
                        part_id: partID
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                    $scope.processes = data;
                    $('.processSortable').sortable({
                        handle: ".processHandle"
                    });
                    $('.processSortable').disableSelection();
                    $('.processSortable').on('sortupdate', function( event, ui ) {
                        for(var i = 0; i < $scope.processes.length; i++) {
                            oldDisplayOrderIDs = $('.processSortable').sortable("toArray");
                            var request = $http({
                                method: "post",
                                url: "/update_process_verification_order",
                                data: {
                                    new_display_order: i,
                                    process_id: parseInt(oldDisplayOrderIDs[i])
                                }
                            })
                            .success(function(data) {
                                console.log("Success.");
                            })
                            .error(function(data) {
                                console.log('Error: ' + data);
                            });
                        }
                    });
                    $('.processVerificationContainer').show();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

                // TODO --------------------------------------------
                // Show containers
                $('.addProcessContainer').show();
            }
        });
    }, 250);

    // FUNCTIONS
    // ===================================================================
    $scope.copyProcess = function() {
        // Check inputs for bad input
        if ( $('.copyProcess #copyProcessCell').find('option:selected').val() !== 1 && $('.copyProcess #copyProcessPart').find('option:selected').val() !== 1 ) {
            // Check if info exists for input
            var cellID = $('.copyProcess #copyProcessCell').find('option:selected').val();
            var cellName = $('.copyProcess #copyProcessCell').find('option:selected').text();
            var partID = $('.copyProcess #copyProcessPart').find('option:selected').val();
            var partName = $('.copyProcess #copyProcessPart').find('option:selected').text();
            var currentCellID = $('#processCell').find('option:selected').val();
            var currentPartID = $('#processPart').find('option:selected').val();
            var request = $http({
                method: "post",
                url: "/get_process_verification",
                data: {
                    cell_id: cellID,
                    part_id: partID
                }
            })
            .success(function(data) {
                console.log("Success.");
                if ( data.length > 0 ) {
                    // If something exists, warn that something exists, ask to proceed
                    var rowsExist = true;
                    var confirm = window.confirm("The process list on cell "+cellName+" for part "+partName+" already contains data. Are you sure you want to copy?");
                }
                else {
                    // If nothing exists, ask to proceed
                    var confirm = window.confirm("Are you sure you want to copy this process list to cell "+cellName+" for part "+partName+"?");
                }
                if (confirm == true) {
                    // Run copy
                    // Get Current Data
                    var request = $http({
                        method: "post",
                        url: "/get_process_verification",
                        data: {
                            cell_id: currentCellID,
                            part_id: currentPartID
                        }
                    })
                    .success(function(data) {
                        console.log("Success.");
                        if ( data.length > 0 ) {
                            for ( var i = 0; i < data.length; i++ ) {
                                if ( rowsExist === true ) {
                                    data[i].display_order += data.length;
                                }
                                var request = $http({
                                    method: "post",
                                    url: "/add_process_verification",
                                    data: {
                                        cell_id: cellID,
                                        part_id: partID,
                                        question: data[i].question,
                                        question_type: data[i].question_type,
                                        display_order: data[i].display_order
                                    }
                                })
                                .success(function(data) {
                                    console.log("Success.");
                                    // Reload Process list (just incase they copied to the same part)
                                    var request = $http({
                                        method: "post",
                                        url: "/get_process_verification",
                                        data: {
                                            cell_id: currentCellID,
                                            part_id: currentPartID
                                        }
                                    })
                                    .success(function(data) {
                                        console.log("Success.");
                                        $scope.processes = data;
                                        showCopy = false;
                                        $('.show-options-btn').text('Show Options');
                                        $('.copyProcess').slideUp();
                                        setTimeout(function() {
                                            $('.copyProcess #copyProcessCell option:nth-child(1)').attr('selected', 'selected');
                                            $('.copyProcess #copyProcessPart option:nth-child(1)').attr('selected', 'selected');
                                        }, 300);
                                        $('#app-notifications p').text('Process copied successfully.');
                                        notificationPopup();
                                    })
                                    .error(function(data) {
                                        console.log('Error: ' + data);
                                    });
                                })
                                .error(function(data) {
                                    console.log('Error: ' + data);
                                });
                            }
                        }
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
        else {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Please choose a valid cell and part.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
    }

    $scope.showOptions = function() {
        if ( showCopy === true ) {
            showCopy = false;
            $('.show-options-btn').text('Show Options');
            $('.copyProcess').slideUp();
            setTimeout(function() {
                $('.copyProcess #copyProcessCell option:nth-child(1)').attr('selected', 'selected');
                $('.copyProcess #copyProcessPart option:nth-child(1)').attr('selected', 'selected');
            }, 300);
        }
        else {
            showCopy = true;
            $('.show-options-btn').text('Hide Options');
            $('.copyProcess').slideDown();
        }
    }

    $scope.addProcess = function() {
        var cellID = $('#processCell').find('option:selected').val();
        var partID = $('#processPart').find('option:selected').val();
        var question = $('#processQuestion').val().trim();
        var questionType = $('#processType').find('option:selected').val();
        var displayOrder = $scope.processes.length;

        if(question != '') {
            if (questionType != 1) {
                var request = $http({
                    method: "post",
                    url: "/add_process_verification",
                    data: {
                        cell_id: cellID,
                        part_id: partID,
                        question: question,
                        question_type: questionType,
                        display_order: displayOrder
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                    $('#app-notifications p').text('Process added successfully.');
                    notificationPopup();
                    var request = $http({
                        method: "post",
                        url: "/get_process_verification",
                        data: {
                            cell_id: cellID,
                            part_id: partID
                        }
                    })
                    .success(function(data) {
                        console.log("Success.");
                        $scope.processes = data;
                        $('#processQuestion').val('');
                        $('#processType').find('option:first').attr('selected', 'selected');

                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            }
            else {
                $('#app-notifications').css('background-color', 'red');
                $('#app-notifications p').text('Please choose a valid question type.');
                notificationPopup();
                setTimeout(function() {
                    $('#app-notifications').css('background-color', 'green');
                }, 4000);
            }
        }
        else {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Please enter a question.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
    }

    $scope.showEditProcess = function(processID) {
        var request = $http({
            method: "post",
            url: "/get_process_verification_by_id",
            data: {
                process_id: processID
            }
        })
        .success(function(data) {
            console.log("Success.");
            var process = data[0];
            $('#editProcessQuestion').val(process.question);
            $('#editProcessType').find('option[value="'+process.question_type+'"]').attr('selected', 'selected');
            $('#editProcessID').val(processID);
            $('.pageContainer').slideUp();
            $('.editProcessContainer').slideDown();
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }

    $scope.cancelEditProcess = function() {
        $('#editProcessQuestion').val('');
        $('#editProcessType').find('option:first').attr('selected', 'selected');
        $('#editProcessID').val('');
        $('.editProcessContainer').slideUp();
        $('.pageContainer').slideDown();
    }

    $scope.editProcess = function() {
        var cellID = $('#processCell').find('option:selected').val();
        var partID = $('#processPart').find('option:selected').val();
        var processID = $('#editProcessID').val();
        var processQuestion = $('#editProcessQuestion').val().trim();
        var processType = $('#editProcessType').find('option:selected').val();

        if(processQuestion != '') {
            if (processType != 1) {
                var request = $http({
                    method: "post",
                    url: "/edit_process_verification",
                    data: {
                        process_id: processID,
                        question: processQuestion,
                        question_type: processType
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                    $('#app-notifications p').text('Process edit successfully.');
                    notificationPopup();
                    var request = $http({
                        method: "post",
                        url: "/get_process_verification",
                        data: {
                            cell_id: cellID,
                            part_id: partID
                        }
                    })
                    .success(function(data) {
                        console.log("Success.");
                        $scope.processes = data;
                        $('#editProcessQuestion').val('');
                        $('#editProcessType').find('option:first').attr('selected', 'selected');
                        $('#editProcessID').val('');
                        $('.editProcessContainer').slideUp();
                        $('.pageContainer').slideDown();
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            }
            else {
                $('#app-notifications').css('background-color', 'red');
                $('#app-notifications p').text('Please choose a valid question type.');
                notificationPopup();
                setTimeout(function() {
                    $('#app-notifications').css('background-color', 'green');
                }, 4000);
            }
        }
        else {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Please enter a question.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
    }

    $scope.deleteProcess = function(processID) {
        var cellID = $('#processCell').find('option:selected').val();
        var partID = $('#processPart').find('option:selected').val();
        var confirm = window.confirm("Are you sure you want to delete this process?");
        if (confirm == true) {
            var request = $http({
                method: "post",
                url: "/delete_process_verification",
                data: {
                    process_id: processID
                }
            })
            .success(function(data) {
                console.log("Success.");
                $('#app-notifications p').text('Process Verification Delete Successfully.');
                notificationPopup();
                var request = $http({
                    method: "post",
                    url: "/get_process_verification",
                    data: {
                        cell_id: cellID,
                        part_id: partID
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                    $scope.processes = data;
                    oldDisplayOrderIDs = $('.processSortable').sortable("toArray");
                    for(var i = 0; i < $scope.processes.length; i++) {
                        var request = $http({
                            method: "post",
                            url: "/update_process_verification_order",
                            data: {
                                new_display_order: i,
                                process_id: parseInt($scope.processes[i].id)
                            }
                        })
                        .success(function(data) {
                            console.log("Success.");
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                    }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    }
}

/* =======================================================================
    HUTCHINSON[3.14] - OPERATOR PROCESS VERIFICATION CONTROLLER
    - Get data from the database
    - Set Angular variables to be used for display data.
    - Functions to control actions of the schedule page.
========================================================================== */
function operatorProcessVerificationController($scope, $http) {
    // DEFINE OBJECTS
    // ===================================================================
    $scope.cells = {};
    $scope.parts = {};
    $scope.processes = [];
    var oldDisplayOrderIDs = [];
    var showCopy = false;

    // INITIALZE DATA ON PAGE
    // ===================================================================
    // Cells
    $http.post('/get_cells')
        .success(function(data) {
            $scope.cells = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Parts
    $http.post('/get_parent_part')
        .success(function(data) {
            $scope.parts = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    setTimeout(function() {
        $('#processCell').on('change', function() {
            if($('#processCell').find('option:selected').val() == 1) {
                $('#processPart').find('option:first').attr('selected', 'selected');
                // TODO --------------------------------------------
                // Hide containers
                $('.selectPartContainer').hide();
                $('.selectTypeContainer').hide();
            }
            else {
                $('.selectPartContainer').show();
            }
        });

        $('#processPart').on('change', function() {
            if($('#processPart').find('option:selected').val() == 1) {
                ('#processType').find('option:first').attr('selected', 'selected');
                // TODO --------------------------------------------
                // Hide containers
                $('.processVerificationContainer').hide();
            }
            else {
                var cellID = $('#processCell').find('option:selected').val();
                var partID = $('#processPart').find('option:selected').val();

                var request = $http({
                    method: "post",
                    url: "/get_operator_process_verification",
                    data: {
                        cell_id: cellID,
                        part_id: partID
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                    $scope.processes = data;
                    $('.processSortable').sortable({
                        handle: ".processHandle"
                    });
                    $('.processSortable').disableSelection();
                    $('.processSortable').on('sortupdate', function( event, ui ) {
                        for(var i = 0; i < $scope.processes.length; i++) {
                            oldDisplayOrderIDs = $('.processSortable').sortable("toArray");
                            var request = $http({
                                method: "post",
                                url: "/update_operator_process_verification_order",
                                data: {
                                    new_display_order: i,
                                    process_id: parseInt(oldDisplayOrderIDs[i])
                                }
                            })
                            .success(function(data) {
                                console.log("Success.");
                            })
                            .error(function(data) {
                                console.log('Error: ' + data);
                            });
                        }
                    });
                    $('.processVerificationContainer').show();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

                // TODO --------------------------------------------
                // Show containers
                $('.addProcessContainer').show();
            }
        });
    }, 250);

    // FUNCTIONS
    // ===================================================================
    $scope.copyProcess = function() {
        // Check inputs for bad input
        if ( $('.copyProcess #copyProcessCell').find('option:selected').val() !== 1 && $('.copyProcess #copyProcessPart').find('option:selected').val() !== 1 ) {
            // Check if info exists for input
            var cellID = $('.copyProcess #copyProcessCell').find('option:selected').val();
            var cellName = $('.copyProcess #copyProcessCell').find('option:selected').text();
            var partID = $('.copyProcess #copyProcessPart').find('option:selected').val();
            var partName = $('.copyProcess #copyProcessPart').find('option:selected').text();
            var currentCellID = $('#processCell').find('option:selected').val();
            var currentPartID = $('#processPart').find('option:selected').val();
            var request = $http({
                method: "post",
                url: "/get_operator_process_verification",
                data: {
                    cell_id: cellID,
                    part_id: partID
                }
            })
            .success(function(data) {
                console.log("Success.");
                if ( data.length > 0 ) {
                    // If something exists, warn that something exists, ask to proceed
                    var rowsExist = true;
                    var confirm = window.confirm("The process list on cell "+cellName+" for part "+partName+" already contains data. Are you sure you want to copy?");
                }
                else {
                    // If nothing exists, ask to proceed
                    var confirm = window.confirm("Are you sure you want to copy this process list to cell "+cellName+" for part "+partName+"?");
                }
                if (confirm == true) {
                    // Run copy
                    // Get Current Data
                    var request = $http({
                        method: "post",
                        url: "/get_operator_process_verification",
                        data: {
                            cell_id: currentCellID,
                            part_id: currentPartID
                        }
                    })
                    .success(function(data) {
                        console.log("Success.");
                        if ( data.length > 0 ) {
                            for ( var i = 0; i < data.length; i++ ) {
                                if ( rowsExist === true ) {
                                    data[i].display_order += data.length;
                                }
                                var request = $http({
                                    method: "post",
                                    url: "/add_operator_process_verification",
                                    data: {
                                        cell_id: cellID,
                                        part_id: partID,
                                        question: data[i].question,
                                        question_type: data[i].question_type,
                                        display_order: data[i].display_order
                                    }
                                })
                                .success(function(data) {
                                    console.log("Success.");
                                    // Reload Process list (just incase they copied to the same part)
                                    var request = $http({
                                        method: "post",
                                        url: "/get_operator_process_verification",
                                        data: {
                                            cell_id: currentCellID,
                                            part_id: currentPartID
                                        }
                                    })
                                    .success(function(data) {
                                        console.log("Success.");
                                        $scope.processes = data;
                                        showCopy = false;
                                        $('.show-options-btn').text('Show Options');
                                        $('.copyProcess').slideUp();
                                        setTimeout(function() {
                                            $('.copyProcess #copyProcessCell option:nth-child(1)').attr('selected', 'selected');
                                            $('.copyProcess #copyProcessPart option:nth-child(1)').attr('selected', 'selected');
                                        }, 300);
                                        $('#app-notifications p').text('Process copied successfully.');
                                        notificationPopup();
                                    })
                                    .error(function(data) {
                                        console.log('Error: ' + data);
                                    });
                                })
                                .error(function(data) {
                                    console.log('Error: ' + data);
                                });
                            }
                        }
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
        else {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Please choose a valid cell and part.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
    }

    $scope.showOptions = function() {
        if ( showCopy === true ) {
            showCopy = false;
            $('.show-options-btn').text('Show Options');
            $('.copyProcess').slideUp();
            setTimeout(function() {
                $('.copyProcess #copyProcessCell option:nth-child(1)').attr('selected', 'selected');
                $('.copyProcess #copyProcessPart option:nth-child(1)').attr('selected', 'selected');
            }, 300);
        }
        else {
            showCopy = true;
            $('.show-options-btn').text('Hide Options');
            $('.copyProcess').slideDown();
        }
    }

    $scope.addProcess = function() {
        var cellID = $('#processCell').find('option:selected').val();
        var partID = $('#processPart').find('option:selected').val();
        var question = $('#processQuestion').val().trim();
        var questionType = $('#processType').find('option:selected').val();
        var displayOrder = $scope.processes.length;

        if(question != '') {
            if (questionType != 1) {
                var request = $http({
                    method: "post",
                    url: "/add_operator_process_verification",
                    data: {
                        cell_id: cellID,
                        part_id: partID,
                        question: question,
                        question_type: questionType,
                        display_order: displayOrder
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                    $('#app-notifications p').text('Process added successfully.');
                    notificationPopup();
                    var request = $http({
                        method: "post",
                        url: "/get_operator_process_verification",
                        data: {
                            cell_id: cellID,
                            part_id: partID
                        }
                    })
                    .success(function(data) {
                        console.log("Success.");
                        $scope.processes = data;
                        $('#processQuestion').val('');
                        $('#processType').find('option:first').attr('selected', 'selected');

                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            }
            else {
                $('#app-notifications').css('background-color', 'red');
                $('#app-notifications p').text('Please choose a valid question type.');
                notificationPopup();
                setTimeout(function() {
                    $('#app-notifications').css('background-color', 'green');
                }, 4000);
            }
        }
        else {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Please enter a question.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
    }

    $scope.showEditProcess = function(processID) {
        var request = $http({
            method: "post",
            url: "/get_operator_process_verification_by_id",
            data: {
                process_id: processID
            }
        })
        .success(function(data) {
            console.log("Success.");
            var process = data[0];
            $('#editProcessQuestion').val(process.question);
            $('#editProcessType').find('option[value="'+process.question_type+'"]').attr('selected', 'selected');
            $('#editProcessID').val(processID);
            $('.pageContainer').slideUp();
            $('.editProcessContainer').slideDown();
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }

    $scope.cancelEditProcess = function() {
        $('#editProcessQuestion').val('');
        $('#editProcessType').find('option:first').attr('selected', 'selected');
        $('#editProcessID').val('');
        $('.editProcessContainer').slideUp();
        $('.pageContainer').slideDown();
    }

    $scope.editProcess = function() {
        var cellID = $('#processCell').find('option:selected').val();
        var partID = $('#processPart').find('option:selected').val();
        var processID = $('#editProcessID').val();
        var processQuestion = $('#editProcessQuestion').val().trim();
        var processType = $('#editProcessType').find('option:selected').val();

        if(processQuestion != '') {
            if (processType != 1) {
                var request = $http({
                    method: "post",
                    url: "/edit_operator_process_verification",
                    data: {
                        process_id: processID,
                        question: processQuestion,
                        question_type: processType
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                    $('#app-notifications p').text('Process edit successfully.');
                    notificationPopup();
                    var request = $http({
                        method: "post",
                        url: "/get_operator_process_verification",
                        data: {
                            cell_id: cellID,
                            part_id: partID
                        }
                    })
                    .success(function(data) {
                        console.log("Success.");
                        $scope.processes = data;
                        $('#editProcessQuestion').val('');
                        $('#editProcessType').find('option:first').attr('selected', 'selected');
                        $('#editProcessID').val('');
                        $('.editProcessContainer').slideUp();
                        $('.pageContainer').slideDown();
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            }
            else {
                $('#app-notifications').css('background-color', 'red');
                $('#app-notifications p').text('Please choose a valid question type.');
                notificationPopup();
                setTimeout(function() {
                    $('#app-notifications').css('background-color', 'green');
                }, 4000);
            }
        }
        else {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Please enter a question.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
    }

    $scope.deleteProcess = function(processID) {
        var cellID = $('#processCell').find('option:selected').val();
        var partID = $('#processPart').find('option:selected').val();
        var confirm = window.confirm("Are you sure you want to delete this process?");
        if (confirm == true) {
            var request = $http({
                method: "post",
                url: "/delete_operator_process_verification",
                data: {
                    process_id: processID
                }
            })
            .success(function(data) {
                console.log("Success.");
                $('#app-notifications p').text('Process Verification Delete Successfully.');
                notificationPopup();
                var request = $http({
                    method: "post",
                    url: "/get_operator_process_verification",
                    data: {
                        cell_id: cellID,
                        part_id: partID
                    }
                })
                .success(function(data) {
                    console.log("Success.");
                    $scope.processes = data;
                    oldDisplayOrderIDs = $('.processSortable').sortable("toArray");
                    for(var i = 0; i < $scope.processes.length; i++) {
                        var request = $http({
                            method: "post",
                            url: "/update_operator_process_verification_order",
                            data: {
                                new_display_order: i,
                                process_id: parseInt($scope.processes[i].id)
                            }
                        })
                        .success(function(data) {
                            console.log("Success.");
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                    }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    }
}

/* =======================================================================
    HUTCHINSON[3.15] - HISTORIAN DATA CONTROLLER
    - GET HISTORIAN DATA BASED ON CHOSEN CELL.
========================================================================== */
function historianDataController($scope, $http) {
    // DEFINE OBJECTS
    // ===================================================================
    $scope.cells = {};
    var selectedCell = 4;

    // INITIALZE DATA ON PAGE
    // ===================================================================
    $http.post('/get_cells')
    .success(function(data) {
        $scope.cells = data;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });

    setTimeout(function() {
        $('#cellSelect').find('#cell-4').attr('selected', 'selected');
        getExistingHistorianData();
    }, 250);

    // Setup the 15 second interval that will add new data to the graphs based on timestamps
    historianDataInterval = setInterval(function() {
        var maxSecondWidth = 5;
        var maxHourHeight = 200;
        var currentDate = new Date();
        var currentTime = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
        if(currentDate.getHours() >= 0 && currentDate.getMinutes() == 0 && currentDate.getSeconds() < 60) {
            // New Hour!
            // Set the time an hour ago.
            currentDate.setHours(currentDate.getHours() - 1);
            // Get the timestamp for the past hour.
            var pastHour = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + " " + currentDate.getHours() + ':00:00';
            var request = $http({
                 method: "post",
                 url: "/get_past_hour_data",
                 data: {
                    past_hour: pastHour,
                    cell_id: selectedCell
                 }
             })
             .success(function(data) {
                 var response = data[0];
                // Remove first bar from the hours graph
                $('.hoursContainer .hoursGraph .interval:first').remove();
                $('.hoursContainer .hoursGraph .interval').animate({
                    left: "-=31"
                });
                hourBarLeft -= 31;

                // Add the new data to the hours graph
                if(typeof response !== 'undefined') {
                    if(response.count < maxHourHeight) {
                        // If the count is less than the max height, calculate the percentage
                        var height = ( response.count / maxHourHeight ) * 100;
                        $('.hoursContainer .hoursGraph').append('<span class="interval" style="height:'+height+'%; left:'+hourBarLeft+'px;"></span>');
                        hourBarLeft += 31;
                    }
                    else {
                        // If the count is more or equal to the max, set the height to 100%
                        $('.hoursContainer .hoursGraph').append('<span class="interval" style="height:100%; left:'+hourBarLeft+'px;"></span>');
                        hourBarLeft += 31;
                    }
                }
                else {
                    $('.hoursContainer .hoursGraph').append('<span class="interval" style="height:0%; left:'+hourBarLeft+'px;"></span>');
                    hourBarLeft += 31;
                }
             })
             .error(function(data){
                 console.log('Error: ' + data);
             });
             currentDate.setHours(currentDate.getHours() + 1);
        }
        // Calculate the time, 1 minute ago.
        var currentMinute = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + " " + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
        currentDate.setMinutes(currentDate.getMinutes() - 1);
        var pastMinute = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + " " + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
        var request = $http({
             method: "post",
             url: "/get_seconds_data",
             data: {
                current_minute: currentMinute,
                past_minute: pastMinute,
                cell_id: selectedCell
             }
         })
         .success(function(data) {
            var response = data[0];
            console.log(response);
            // Remove the first second interval
            $('.secondsContainer .secondsGraph .interval:first').remove();
            $('.secondsContainer .secondsGraph .interval').animate({
                bottom: "-=5.558333333333"
            });
            secondBarBottom -= 5.558333333333;
            // Add the new data to the seconds graph
            if(typeof response !== 'undefined') {
                if(response.count < maxSecondWidth) {
                    // If the count is less than the max height, calculate the percentage
                    var width = ( response.count / maxSecondWidth ) * 100;
                    $('.secondsContainer .secondsGraph').append('<span class="interval" style="width:'+width+'%; bottom:'+secondBarBottom+'px;"></span>');
                    secondBarBottom += 5.558333333333;
                }
                else {
                    // If the count is more or equal to the max, set the height to 100%
                    $('.secondsContainer .secondsGraph').append('<span class="interval" style="width:100%; bottom:'+secondBarBottom+'px;"></span>');
                    secondBarBottom += 5.558333333333;
                }
            }
            else {
                $('.secondsContainer .secondsGraph').append('<span class="interval" style="width:0%; bottom:'+secondBarBottom+'px;"></span>');
                secondBarBottom += 5.558333333333;
            }
         })
         .error(function(data){
             console.log('Error: ' + data);
         });
    }, 60000);

    // FUNCTIONS
    // ===================================================================
    // Create function to find index of hours array
    function arrayObjectIndexOf(myArray, searchTerm, property) {
        for ( var i = 0; i < myArray.length; i++ ) {
            if ( myArray[i][property] == searchTerm ) return i;
        }
        return -1;
    }

    $('#cellSelect').on('change', function() {
        selectedCell = $(this).find('option:selected').val();
        $('.secondsContainer .secondsGraph .interval').remove();
        $('.hoursContainer .hoursGraph .interval').remove();
    	getExistingHistorianData();
    });

    function getExistingHistorianData() {
        var hours = [];
        var seconds = [];

        var currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 1);
        var pastDayEnd = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + " " + currentDate.getHours() + ":59:59";
        var pastDate = new Date();
        pastDate.setHours(pastDate.getHours() - 24);
        var pastDayStart = pastDate.getFullYear() + "-" + (pastDate.getMonth() + 1) + "-" + pastDate.getDate() + " " + pastDate.getHours() + ":00:00";

        var request = $http({
            method: "post",
            url: "/get_hour_graph_data",
            data: {
                past_day_start: pastDayStart,
                past_day_end: pastDayEnd,
          cell_id: selectedCell
            }
        })
        .success(function(data) {
            hourBarLeft = 0;
            var maxHourHeight = 200;
            for ( var i = 23; i >= 0; i-- ) {
                var found = false;
                var iHoursAgo = currentDate.getHours() - i;
                if ( iHoursAgo < 0 ) {
                    iHoursAgo = 24 + iHoursAgo;
                }
                for ( var j = 0; j < data.length; j++ ) {
                    if ( ( data[j].hour == iHoursAgo ) && !found ) {
                        hours.push({
                            hour: iHoursAgo,
                            total: data[j].count
                        });
                        found = true;
                    }
                }
                if ( !found ) {
                    hours.push({
                        hour: iHoursAgo,
                        total: 0
                    });
                }
            }
            // Add hour bars that include data.
            for ( var i = 0; i < hours.length; i++ ) {
                // If the data is less than the max height, calculate the percentage
                if(hours[i].total < maxHourHeight) {
                    var height = ( hours[i].total / maxHourHeight ) * 100;
                    $('<span class="interval" style="height:0%; left:'+hourBarLeft+'px;"></span>').appendTo('.hoursContainer .hoursGraph').animate({
                       height: height+"%"
                    }, 3000);
                    hourBarLeft += 31;
                }
                // If the data is more or equal to the max, set it to 100%
                else {
                    $('<span class="interval" style="height:0%; left:'+hourBarLeft+'px;"></span>').appendTo('.hoursContainer .hoursGraph').animate({
                       height: "100%"
                    }, 3000);
                    hourBarLeft += 31;
                }
            }
        })
        .error(function(data){
            console.log('Error: ' + data);
        });

        var currentHour = new Date();
        currentHour.setHours(currentHour.getHours());
        var currentSecondGraphTime = currentHour.getFullYear() + "-" + (currentHour.getMonth() + 1) + "-" + currentHour.getDate() + " " + currentHour.getHours() + ":" + currentHour.getMinutes() + ":" + currentHour.getSeconds();
        var pastHour = new Date();
        pastHour.setHours(pastHour.getHours() - 1);
        var pastHourSecondGraphTime = pastHour.getFullYear() + "-" + (pastHour.getMonth() + 1) + "-" + pastHour.getDate() + " " + pastHour.getHours() + ":" + pastHour.getMinutes() + ":" + pastHour.getSeconds();
        var request = $http({
            method: "post",
            url: "/get_second_graph_data",
            data: {
                past_hour_start: pastHourSecondGraphTime,
                past_hour_end: currentSecondGraphTime,
          cell_id: selectedCell
            }
        })
        .success(function(data) {
            secondBarBottom = 0;
            var maxSecondWidth = 5;
            for ( var i = 0; i < 60; i++ ) {
                var found = false;
                var iMinutesAgo = currentHour.getMinutes() - i;
                if ( iMinutesAgo < 0 ) {
                    iMinutesAgo = 60 + iMinutesAgo;
                }
                for ( var j = 0; j < data.length; j++ ) {
                    if ( ( data[j].minute == iMinutesAgo ) && !found ) {
                        seconds.push({
                            minute: i,
                            total: data[j].count
                        });
                        found = true;
                    }
                }
                if ( !found ) {
                    seconds.push({
                        minute: i,
                        total: 0
                    });
                }
            }

            // Add the seconds bars that include data.
            for ( var i = 0; i < seconds.length; i++ ) {
                // If the data is less than the max width (or 0), calcualte the percentage
                if(seconds[i].total < maxSecondWidth) {
                    var width = ( seconds[i].total / maxSecondWidth ) * 100;
                    $('<span class="interval" style="width:0%; bottom:'+secondBarBottom+'px;"></span>').appendTo('.secondsContainer .secondsGraph').animate({
                        width: width+"%"
                    }, 3000);
                    secondBarBottom += 5.558333333333;
                }
                // If the data is more or equal to the max, set it to 100%
                else {
                    $('<span class="interval" style="width:0%; bottom:'+secondBarBottom+'px;"></span>').appendTo('.secondsContainer .secondsGraph').animate({
                        width: "100%"
                    }, 3000);
                    secondBarBottom += 5.558333333333;
                }
            }
        })
        .error(function(data){
            console.log('Error: ' + data);
        });
    }
}

/* =======================================================================
    HUTCHINSON[3.11] - DOWNTIME HISTORY CONTROLLER
    - Get data from the database
    - Set Angular variables to be used for display data.
    - Functions to control actions of the schedule page.
========================================================================== */
function downtimeHistoryController($scope, $http, $location) {
    // DEFINE OBJECTS
    // ===================================================================
    $scope.downtimeHistory = {};
    $scope.cellInfo = {};

    // INITIALZE DATA ON PAGE
    // ===================================================================
    $http.post('/get_cells')
        .success(function(data) {
            $scope.cellInfo = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    var request = $http({
          method: "post",
          url: "/get_downtime_history",
          data: {
              cell_id: 5
          }
      })
      .success(function(data) {
          for(var i = 0; i < data.length; i++) {
            // 0000-00-00 00:00:00
            var readableDate = new Date(data[i].timestamp);
            data[i].timestamp = readableDate.getFullYear() + "-" + addZero(readableDate.getMonth() + 1) + "-" + addZero(readableDate.getDate()) + " " + addZero(readableDate.getHours()) + ":" + addZero(readableDate.getMinutes()) + ":" + addZero(readableDate.getSeconds());
          }
          $scope.downtimeHistory = data;
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });

    // FUNCTIONS
    // ===================================================================
    setTimeout(function() {
        $('#cellSelect option[value="5"]').attr('selected', 'selected')
        $('#cellSelect').on('change', function() {
            $scope.getDowntimeHistory();
        });
    }, 250);

    function addZero(i) {
        if ( i < 10 ) {
          i = "0" + i;
        }
        return i;
    }

    $scope.getDowntimeHistory = function() {
        var cellID = $('#cellSelect').val();
        var request = $http({
              method: "post",
              url: "/get_downtime_history",
              data: {
                  cell_id: cellID
              }
          })
          .success(function(data) {
              for(var i = 0; i < data.length; i++) {
                // 0000-00-00 00:00:00
                var readableDate = new Date(data[i].timestamp);
                data[i].timestamp = readableDate.getFullYear() + "-" + addZero(readableDate.getMonth() + 1) + "-" + addZero(readableDate.getDate()) + " " + addZero(readableDate.getHours()) + ":" + addZero(readableDate.getMinutes()) + ":" + addZero(readableDate.getSeconds());
              }
              $scope.downtimeHistory = data;
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
    }
}

/* =======================================================================
    HUTCHINSON[3.11] - DOWNTIME REASONS CONTROLLER
    - Get data from the database
    - Set Angular variables to be used for display data.
    - Functions to control actions of the schedule page.
========================================================================== */
function downtimeReasonsController($scope, $http, $location) {
    // DEFINE OBJECTS
    // ===================================================================
    $scope.cellInfo = {};
    $scope.downtimeReasons = {};

    // INITIALZE DATA ON PAGE
    // ===================================================================
    $http.post('/get_cells')
        .success(function(data) {
            $scope.cellInfo = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
      var request = $http({
          method: "post",
          url: "/get_downtime_reasons",
          data: {
              cell_id: 5
          }
      })
      .success(function(data) {
          $scope.downtimeReasons = data;
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });

    // FUNCTIONS
    // ===================================================================
    setTimeout(function() {
        $('#cellSelect option[value="5"]').attr('selected', 'selected')
        $('#cellSelect').on('change', function() {
            $scope.getDowntimeReasons();
        });
    }, 250);

    $scope.getDowntimeReasons = function() {
        var cellID = $('#cellSelect').val();
        var request = $http({
              method: "post",
              url: "/get_downtime_reasons",
              data: {
                  cell_id: cellID
              }
          })
          .success(function(data) {
              $scope.downtimeReasons = data;
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
    }

    $scope.addDowntimeReason = function() {
        var cellID = $('#cellSelect').val();
        var reason = $('.add-reasons-form #downtimeReason').val();
        if ( reason !== '' ) {
            var request = $http({
                method: "post",
                url: "/add_downtime_reasons",
                data: {
                    cell_id: cellID,
                    reason: reason
                }
            })
            .success(function(data) {
                $('#app-notifications p').text('Downtime reason was added successfully.');
                notificationPopup();
                $('.add-reasons-form #downtimeReason').val('');
                $scope.getDowntimeReasons();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
        else {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Please enter a valid downtime reason.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
    }

    $scope.deleteDowntimeReason = function(reason_id) {
        var confirm = window.confirm("Are you sure you want delete this Downtime Reason?");
        if (confirm == true) {
          var request = $http({
                method: "post",
                url: "/delete_downtime_reasons",
                data: {
                    reason_id: reason_id
                }
            })
            .success(function(data) {
                $('#app-notifications p').text('Downtime reason was deleted successfully.');
                notificationPopup();
                $scope.getDowntimeReasons();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    }

    $scope.openEditDowntimeReason = function(reason_id) {
        $('#create-downtime-reasons .manage-downtime-reasons #reasonID').val(reason_id);
        var request = $http({
                method: "post",
                url: "/get_single_downtime_reason",
                data: {
                    reason_id: reason_id
                }
            })
            .success(function(data) {
                $('#create-downtime-reasons .edit-downtime-reason #editDowntimeReason').val(data[0].reason);
                $('#create-downtime-reasons .manage-downtime-reasons').slideUp();
                $('#create-downtime-reasons .edit-downtime-reason').slideDown();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.editDowntimeReason = function() {
        var reason = $('#create-downtime-reasons .edit-downtime-reason #editDowntimeReason').val();
        var reason_id = $('#create-downtime-reasons .manage-downtime-reasons #reasonID').val();
        if ( reason !== '' ) {
            var request = $http({
                method: "post",
                url: "/edit_downtime_reason",
                data: {
                    reason_id: reason_id,
                    reason: reason
                }
            })
            .success(function(data) {
                $('#app-notifications p').text('Downtime reason was edited successfully.');
                notificationPopup();
                $scope.getDowntimeReasons();
                $('#create-downtime-reasons .edit-downtime-reason').slideUp();
                $('#create-downtime-reasons .manage-downtime-reasons').slideDown();
                $('#create-downtime-reasons .edit-downtime-reason #editDowntimeReason').val('');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
        else {
            $('#app-notifications').css('background-color', 'red');
            $('#app-notifications p').text('Please enter a valid downtime reason.');
            notificationPopup();
            setTimeout(function() {
                $('#app-notifications').css('background-color', 'green');
            }, 4000);
        }
    }

    $scope.cancelEditDowntimeReason = function() {
        $('#create-downtime-reasons .edit-downtime-reason').slideUp();
        $('#create-downtime-reasons .manage-downtime-reasons').slideDown();
        $('#create-downtime-reasons .edit-downtime-reason #editDowntimeReason').val('');
    }
}


function adminPartHourlyRate($scope, $http) {
  // DEFINE OBJECTS
  // ===================================================================
  $scope.cellSchedule = [];
  $scope.boxID;
  $scope.cellInfo = {};
  $scope.parts = {};
  $scope.parentParts = {};
  $scope.completedOrders = {};
  var selectedCell;
  var oldDisplayOrderIDs;

  // INITIALZE DATA ON PAGE
  // ===================================================================
  // Hourly Part Rates
  //selectedCell = $('#cellSelect').find('option:selected').val();
  var request = $http({
    method: "post",
    url: "/get_hourly_rates",
    data: {
        //cell_id: selectedCell
        cell_id: 0
    }
  })
  .success(function(data) {
    $scope.cellSchedule = data;
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

  $http.post('/get_cells')
  .success(function(data) {
    $scope.cellInfo = data;
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

  $http.post('/get_part')
  .success(function(data) {
    $scope.parts = data;
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

  //Populates the "Part" dropdown box
  $http.post('/get_parent_part')
    .success(function(data) {
        $scope.parentParts = data;
    })
    .error(function(data) {
        console.log('Error: ' + data);
  });  

  setTimeout(function() {
      $('#cellSelect').on('change', function() {
          $scope.getBoxScheduleNoDelay();
      });
  }, 250);

  // FUNCTIONS
  // ===================================================================
  // Function to create a range based on data passed from a ng-repeat
 
  // Function to get the hourly rates for a certain cell.
  // If you want another cell, change the "cell_id" below.

  $scope.getBoxScheduleNoDelay = function() {
    selectedCell = $('#cellSelect').find('option:selected').val();
    var request = $http({
      method: "post",
      url: "/get_hourly_rates",
      data: {
          cell_id: selectedCell
      }
    })
    .success(function(data) {
        console.log(data);
        if (data.length > 0) {
            $('#box-schedule.scheduleEmpty').remove();
            // Refresh the data
            $scope.cellSchedule = data;
            resetButtons();
        }
        else {
            $scope.cellSchedule = [];
            $('#box-schedule').truncate('<span class="scheduleEmpty">No Results Available</span>');
        }
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
  }

 
  $scope.handlePartRateSubmit = function() {
    var partID = $('#box-part').find("option:selected").val();
    var partName = $('#box-part').find(":selected").text();
    var rate = $('#input-rate').val();
    var cellID = $('#box-cell').find("option:selected").val();
    //var comment = $('#box-comment').val();
    //var displayOrder;

    if(partID != 1 && cellID != 1) {
      if(rate > 0 || rate == ''){
        var request = $http({
            method: "post",
            url: "/get_hourly_rates",
            data: {
                cell_id: cellID
            }
        })
        .success(function(data) {
          //displayOrder = data.length;
          resetButtons();
          var request = $http({
              method: "post",
              url: "/insert_hourly_rate",
              data: {
                  cell_id: cellID,
                  part_id: partID,
                  hourly_rate: rate
                  //comment: comment,
                  //display_order: displayOrder
              }
          })
          .success(function(data) {
              console.log('Successful.');
              $('#box-part').find("option:first").attr('selected', 'selected');
              $('#quizQuestionCategory').find("option:first").attr('selected', 'selected');
              $('#box-quantity').val('');
              $('#box-cell').find("option:first").attr('selected', 'selected');
              $('#box-comment').val('');

              var request = $http({
                  method: "post",
                  url: "/get_hourly_rates",
                  data: {
                      cell_id: $('#cellSelect').find('option:selected').val()
                  }
              })
              .success(function(data) {
                $scope.cellSchedule = data;
                console.log(data);
                $('#box-schedule.scheduleEmpty').remove();          
                $('#app-notifications p').text('A new hourly rate for ' + partName + ' has been added.');
                resetButtons();
                notificationPopup();
              })
              .error(function(data) {
                  console.log('Error: ' + data);
              });
          })
          .error(function(data){
              console.log('Error: ' + data);
          });
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
      }// if(rate)
      else{
        $('#app-notifications').css('background-color', 'red');
        $('#app-notifications p').text('Rate can not be 0 or empty.');
        notificationPopup();
        resetButtons();
        setTimeout(function() {
            $('#app-notifications').css('background-color', 'green');
        }, 4000);
      }        
    }//if(part && cell)
    else {
      $('#app-notifications').css('background-color', 'red');
      $('#app-notifications p').text('Please choose a valid part number and cell number.');
      notificationPopup();
      setTimeout(function() {
          $('#app-notifications').css('background-color', 'green');
      }, 4000);
    }
  }


  //"Edit Rate" button, old name used to avoid css issues
  $scope.adminAddComment = function(boxID) {
      $('section#box-schedule > div#box-' + boxID + ' input[name="boxRate"]').show();
      $('section#box-schedule > div#box-' + boxID + ' a.adminAddComment').hide();
      $('section#box-schedule > div#box-' + boxID + ' a.adminSaveComment').css({'display':'inline-block'});
  }

  $scope.adminSaveComment = function(boxID) {
    var nRate = $('section#box-schedule > div#box-' + boxID + ' input[name="boxRate"]').val().trim();

    if(nRate >= 0){
      var request = $http({
      method: "post",
      url: "/update_hourly_rate",
      data: {
        box_id: boxID,
        newRate: nRate
      }
      })
      .success(function(data) {
        console.log("Success");
        var request = $http({
            method: "post",
            url: "/get_hourly_rates",
            data: {
                cell_id: $('#cellSelect').find('option:selected').val()
            }
        })
        .success(function(data) {
          $scope.cellSchedule = data;
          resetButtons();
          $('#app-notifications p').text('Your new rate has been saved.');
          notificationPopup();
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      })
      .error(function(data) {
       console.log('Error: ' + data);
      });
    }
    else{
      $('#app-notifications').css('background-color', 'red');
      $('#app-notifications p').text('Hourly rate can not be less than 0.');
      notificationPopup();
      setTimeout(function() {
          $('#app-notifications').css('background-color', 'green');
      }, 4000);
    }
    
  }//End adminSaveRate

  function resetButtons() {
      setTimeout(function() {
          $('#box-schedule > div').each(function() {
              if ($(this).find('span:first').is(':empty')) {
                  $(this).find('a.adminAddComment').css({'display':'inline-block'});
              }
              else {
                  $(this).find('a.adminEditComment').css({'display':'inline-block'});
              }
          });
      }, 200);
  }//End resetButtions
}


/* =======================================================================
    HUTCHINSON[3.16] - MAIN CONTROLLER
    - Not being used at the moment.
========================================================================== */
function mainController($scope, $http) {
    // DEFINE OBJECTS
    // ===================================================================
    // $scope.userStations = {};
    // $scope.downtimeLog = {};
    // $scope.maintenanceLog = {};
    // $scope.cellID = {};
    // $scope.userID = {};
    // $scope.downtimeCodes = {};

    // INITIALZE DATA ON PAGE
    // ===================================================================
    // // User Stations
    // $http.post('/get_user_stations')
    //     .success(function(data) {
    //         $scope.userStations = data;
    //     })
    //     .error(function(data) {
    //         console.log('Error: ' + data);
    //     });

    // // Get Cell ID - Maintenance Log
    // $http.post('/get_cell_id')
    //     .success(function(data) {
    //         $scope.cellID = data;
    //     })
    //     .error(function(data) {
    //         console.log('Error: ' + data);
    //     });

    // // Get User ID - Maintenance Log
    // $http.post('/get_user_id')
    //     .success(function(data) {
    //         $scope.userID = data;
    //     })
    //     .error(function(data) {
    //         console.log('Error: ' + data);
    //     });

    // // Get Downtime Codes - Downtime Log
    // $http.post('/get_downtime_code')
    //     .success(function(data) {
    //         $scope.downtimeCodes = data;
    //     })
    //     .error(function(data) {
    //         console.log('Error: ' + data);
    //     });

    // FUNCTIONS
    // ===================================================================
    // Logout function
    $scope.logout = function() {
        authenticated_users.admin = false;
        admin_roles = false;
        $('#page-header .user-logged-in .user-image img').attr('src', '').attr('alt', '');
        $('#page-header .user-information .user-name').text('');
        $('#main-page-header .user-logged-in .user-image img').attr('src', '').attr('alt', '');
        $('#main-page-header .user-information .user-name').text('');
    }
    // Function to get User Stations
    // $scope.getUserStations = function() {
    //     $http.post('/get_user_stations')
    //         .success(function(data) {
    //             $scope.userStations = data;
    //         })
    //         .error(function(data) {
    //             console.log('Error: ' + data);
    //         });
    // }

    // // Function to assign a user to a specific station
    // $scope.assignToStation = function(location) {
    //     var randomUser = Math.floor(Math.random() * 9) + 1;

    //     var request = $http({
    //         method: "post",
    //         url: "/check_user_stations",
    //         data: {
    //             id: randomUser
    //         }
    //     })
    //     .success(function(data) {
    //         if(data[0].count > 0) {
    //             var request = $http({
    //                 method: "post",
    //                 url: "/remove_user_from_station",
    //                 data: {
    //                     id: randomUser
    //                 }
    //             })
    //             .success(function(data) {
    //                 var request = $http({
    //                     method: "post",
    //                     url: "/add_user_to_station",
    //                     data: {
    //                         id: randomUser,
    //                         location: location
    //                     }
    //                 })
    //                 .success(function(data) {
    //                     $scope.getUserStations();
    //                 })
    //                 .error(function(data){
    //                     console.log('Error: ' + data);
    //                 });
    //             });
    //         }
    //         else {
    //             var request = $http({
    //                 method: "post",
    //                 url: "/add_user_to_station",
    //                 data: {
    //                     id: randomUser,
    //                     location: location
    //                 }
    //             })
    //             .success(function(data) {
    //                 $scope.getUserStations();
    //             })
    //             .error(function(data){
    //                 console.log('Error: ' + data);
    //             });
    //         }
    //     })
    //     .error(function(data){
    //         console.log('Error: ' + data);
    //     });
    // }

    // $scope.getDowntimeLog = function() {
    //     var startDate = $( "#inputFromDateDown" ).val();
    //     var stopDate = $( "#inputToDateDown" ).val();
    //     if(startDate != '' && stopDate != '')
    //     {
    //         var request = $http({
    //             method: "post",
    //             url: "/get_downtime_log",
    //             data: {
    //                 startdate: startDate,
    //                 stopdate: stopDate
    //             }
    //         })
    //         .success(function(data) {
    //             $scope.downtimeLog = data;
    //         })
    //         .error(function(data) {
    //             console.log('Error: ' + data);
    //         });
    //     }
    // }

    // $scope.getMaintenanceLog = function() {
    //     var startDate = $( "#inputFromDateMain" ).val();
    //     var stopDate = $( "#inputToDateMain" ).val();
    //     if(startDate != '' && stopDate != '')
    //     {
    //         var request = $http({
    //             method: "post",
    //             url: "/get_changeover_log",
    //             data: {
    //                 startdate: startDate,
    //                 stopdate: stopDate
    //             }
    //         })
    //         .success(function(data) {
    //             $scope.maintenanceLog = data;
    //         })
    //         .error(function(data) {
    //             console.log('Error: ' + data);
    //         });
    //     }
    // }

    // $scope.submitMaintenanceLog = function() {
    //     var cellID = $( "#mainLogCellID" ).val();
    //     var userID = $( "#mainLogUserID" ).val();
    //     var partFromID = $( "#mainLogPartFrom" ).val();
    //     var partToID = $( "#mainLogPartTo" ).val();
    //     var datetimeVal = $( "#mainLogDate" ).val();
    //     var duration = $( "#mainLogDuration" ).val();
    //     var comment = $( "#mainLogComments" ).val();
    //     var vacTemp = $("#mainLogVacTemp").val();
    //     var mtsNumber = $("#mainLogMTSNumber").prop("checked");

    //     if(cellID != 1 && userID != 1 && partFromID != 1 && partToID != 1 && datetimeVal != '' && duration != '')
    //     {
    //         var request = $http({
    //             method: "post",
    //             url: "/submit_changeover",
    //             data: {
    //                 cell_id: cellID,
    //                 user_id: userID,
    //                 part_from_id: partFromID,
    //                 part_to_id: partToID,
    //                 datetime_val: datetimeVal,
    //                 duration: duration,
    //                 comment: comment,
    //                 vac_temp: vacTemp,
    //                 mts_number: mtsNumber
    //             }
    //         })
    //         .success(function(data) {
    //             console.log('Submitted.');
    //             $("#submitMaintenanceForm").trigger("reset");
    //             $("#mainLogFormSubmitMessage > p").text("Maintenance Log Successfully Submitted");
    //             $("#mainLogFormSubmitMessage").removeClass().addClass("completed-message");
    //         })
    //         .error(function(data) {
    //             console.log('Error: ' + data);
    //             $("#mainLogFormSubmitMessage > p").text("There was an error submitting your Maintenance Log information.");
    //             $("#mainLogFormSubmitMessage").removeClass().addClass("warning-message");
    //         });
    //     }
    //     else
    //     {
    //         $("#mainLogFormSubmitMessage > p").text("There was an error submitting your Maintenance Log information. Please check the required fields and try again.");
    //         $("#mainLogFormSubmitMessage").removeClass().addClass("warning-message");
    //     }
    // }

    // $scope.submitDowntimeLog = function() {
    //     // `id`, `cell_id`, `start_time`, `duration`, `user_id`, `comment`, `code_id`, `follow_up`
    //     var cellID = $( "#downLogCellID" ).val();
    //     var startTime = $( "#downLogStartTime" ).val();
    //     var duration = $( "#downLogDuration" ).val();
    //     var userID = $( "#downLogUserID" ).val();
    //     var comment = $( "#downLogComment" ).val();
    //     var codeID = $( "#downLogCodeID" ).val();
    //     var followUp = $( "#downLogFollowUp" ).prop("checked");

    //     if(cellID != 1 && startTime != '' && duration != '' && userID != 1 && codeID != 1)
    //     {
    //         var request = $http({
    //             method: "post",
    //             url: "/submit_downtime",
    //             data: {
    //                 cell_id: cellID,
    //                 datetime_val: startTime,
    //                 duration: duration,
    //                 user_id: userID,
    //                 comment: comment,
    //                 code_id: codeID,
    //                 follow_up: followUp
    //             }
    //         })
    //         .success(function(data) {
    //             console.log('Submitted.');
    //             $("#submitDowntimeForm").trigger("reset");
    //             $("#downLogFormSubmitMessage > p").text("Downtime Log Successfully Submitted");
    //             $("#downLogFormSubmitMessage").removeClass().addClass("completed-message");
    //         })
    //         .error(function(data) {
    //             console.log('Error: ' + data);
    //             $("#downLogFormSubmitMessage > p").text("There was an error submitting your Downtime Log information.");
    //             $("#downLogFormSubmitMessage").removeClass().addClass("warning-message");
    //         });
    //     }
    //     else
    //     {
    //         $("#downLogFormSubmitMessage > p").text("There was an error submitting your Downtime Log information. Please check the required fields and try again.");
    //         $("#downLogFormSubmitMessage").removeClass().addClass("warning-message");
    //     }
    // }
    // $scope.login = function() {
    //     var userID = parseInt($('div.user-container.user-selected').attr('id'));
    //     if(userID) {
    //         for (var i=0; i < $scope.users.length; i++) {
    //             if ($scope.users[i].user_id === userID) {
    //                 $scope.userLoggedIn = $scope.users[i];
    //                 window.location = "user/dashboard.html";
    //             }
    //         }
    //     }
    // }

    // $scope.selectUser = function() {
    //     $('div.user-container').on('click', function() {
    //         $('div.user-container').removeClass('user-selected');
    //         $(this).addClass('user-selected');
    //     });
    // }
}