 /* =======================================================================
    HUTCHINSON SMART PLANT APPLICATION
========================================================================== */

/* =======================================================================
    ----------------------------------------------------------
    --                      CONTENTS                        --
    ----------------------------------------------------------
    HUTCHINSON[1] - SETUP

        HUTCHINSON[1.1] - VARIABLES
        HUTCHINSON[1.2] - FUNCTIONS

            HUTCHINSON[1.2.1] - GET ALL FILES FROM FOLDER FUNCTION
            HUTCHINSON[1.2.2] - GET ALL FOLDERS FROM FOLDER FUNCTION
            HUTCHINSON[1.2.3] - FORMAT STRING TO KEY/VALUE FUNCTION
            HUTCHINSON[1.2.4] - FORMAT SQL TO KEY/VALUE FUNCTIONS

    HUTCHINSON[2] - CONFIGURATION

    HUTCHINSON[3] - APPLICATION CALLS TO DATABASE

        HUTCHINSON[3.1] - GET CHILD PARTS FROM PARENT ID
        HUTCHINSON[3.2] - ADD TO PARTS QUEUE
        HUTCHINSON[3.3] - ORDER COMPLETE
        HUTCHINSON[3.4] - GET PART QUEUE BASED ON CELL
        HUTCHINSON[3.5] - GET PART QUIZ
        HUTCHINSON[3.6] - GET LIST OF LOGGED IN USERS
        HUTCHINSON[3.7] - GET LIST OF ALL USERS
        HUTCHINSON[3.8] - GET USER ROLES
        HUTCHINSON[3.9] - GET ALL PARTS
        HUTCHINSON[3.10] - ADD NEW PART
        HUTCHINSON[3.11] - ADD PART RELATIONSHIP
        HUTCHINSON[3.12] - REMOVE PART RELATIONSHIP
        HUTCHINSON[3.13] - DELETE PART
        HUTCHINSON[3.14] - GET BOX SCHEDULE BASED ON CELL
        HUTCHINSON[3.15] - INCREMENT COMPLETED BOXES (BOX SCHEDULE)
        HUTCHINSON[3.16] - DECREMENT COMPLETED BOXES (BOX SCHEDULE)
        HUTCHINSON[3.17] - ADMIN INCREMENT AMOUNT OF BOXES (BOX SCHEDULE)
        HUTCHINSON[3.18] - ADMIN DECREMENT AMOUNT OF BOXES (BOX SCHEDULE)
        HUTCHINSON[3.19] - GET LIST OF PARENT PARTS
        HUTCHINSON[3.20] - ADMIN ADD NEW USER
        HUTCHINSON[3.21] - ADMIN ADD USER PRIVILEGE
        HUTCHINSON[3.22] - GET CELL STATUS
        HUTCHINSON[3.23] - GET TRAINING IMAGE FOLDERS
        HUTCHINSON[3.24] - GET USER
        HUTCHINSON[3.25] - GET BADGE NUMBER
        HUTCHINSON[3.26] - GET USER BY BADGE (PRIVILEGE)
        HUTCHINSON[3.27] - GET CELL STATUS RUNNING PART
        HUTCHINSON[3.28] - GET PART ID FROM NUMBER
        HUTCHINSON[3.29] - DELETE USER
        HUTCHINSON[3.30] - SAVE USER ROLE ON EDIT
        HUTCHINSON[3.31] - GET CELLS
        HUTCHINSON[3.32] - ADD BOX SCHEDULE
        HUTCHINSON[3.33] - EDIT / ADD BOX SCHEDULE COMMENT
        HUTCHINSON[3.34] - COMPLETE BOX SCHEDULE
        HUTCHINSON[3.35] - ADD QUIZ QUESTION
        HUTCHINSON[3.36] - ADD QUIZ QUESTION PART
        HUTCHINSON[3.37] - ADD QUIZ QUESTION CELL
        HUTCHINSON[3.38] - ADD QUIZ QUESTION PART CELL
        HUTCHINSON[3.39] - DELETE QUIZ QUESTION
        HUTCHINSON[3.40] - GET ADMIN LOGIN
        HUTCHINSON[3.41] - ADD USER IMAGE UPLOAD
        HUTCHINSON[3.42] - ADD QUALITY ALERTS
        HUTCHINSON[3.43] - QUALITY ALERT IMAGE UPLOAD
        HUTCHINSON[3.44] - DELETE QUALITY ALERT
        HUTCHINSON[3.45] - GET ALL QUALITY ALERTS
        HUTCHINSON[3.46] - QUIZ QUESTION IMAGE UPLOAD
        HUTCHINSON[3.47] - GET PART NAME FROM PART ID
        HUTCHINSON[3.48] - GET CELL NAME FROM CELL ID
        HUTCHINSON[3.49] - GET QUALITY ALERT BY ID
        HUTCHINSON[3.50] - UPDATE QUALITY ALERT
        HUTCHINSON[3.51] - GET QUIZ QUESTION BY ID
        HUTCHINSON[3.52] - UPDATE QUIZ QUESTION
        HUTCHINSON[3.53] - GET USER PERMISSIONS
        HUTCHINSON[3.54] - ADD USER PERMISSION
        HUTCHINSON[3.55] - DELETE USER PERMISSION
        HUTCHINSON[3.56] - GET BADGE SWIPES
        HUTCHINSON[3.57] - GET PART BY NUMBER
        HUTCHINSON[3.58] - CHECK IF BADGE EXISTS IN DATABASE
        HUTCHINSON[3.59] - GET USER BY ID
        HUTCHINSON[3.60] - UPDATE USER IMAGE
        HUTCHINSON[3.61] - GET COMPLETED ORDERS
        HUTCHINSON[3.62] - WORK INSTRUCTION IMAGE UPLOAD
        HUTCHINSON[3.63] - ADD WORK INSTRUCTION
        HUTCHINSON[3.64] - GET CURRENT WORK INSTRUCTION IMAGES
        HUTCHINSON[3.65] - UPDATE WORK INSTRUCTION ORDER
        HUTCHINSON[3.66] - DELETE WORK INSTRUCTION IMAGE
        HUTCHINSON[3.67] - GET ADMIN PRIVILEGES
        HUTCHINSON[3.68] - UPDATE BOX SCHEDULE ORDER
        HUTCHINSON[3.69] - GET PROCESS VERIFICATION
        HUTCHINSON[3.70] - ADD PROCESS VERIFICATION
        HUTCHINSON[3.71] - UPDATE PROCESS VERIFICATION ORDER
        HUTCHINSON[3.72] - GET PROCESS VERIFICATION BY ID
        HUTCHINSON[3.73] - EDIT PROCESS VERIFICATION
        HUTCHINSON[3.74] - DELETE PROCESS VERIFICATION
        HUTCHINSON[3.75] - UNUSED
        HUTCHINSON[3.76] - REMOVE BOX SCHEDULE FROM COMPLETED
        HUTCHINSON[3.77] - ACTIVATE BOX SCHEDULE FROM COMPLETED
        HUTCHINSON[3.78] - GET COUNT OF BOX SCHEDULES FROM CELL
        HUTCHINSON[3.79] - UPDATE HOURLY RATE INFO FOR A CELL AND PART
        HUTCHINSON[3.80] - GRAB EXISTING HOURLY RATE FOR A CELL AND PART
        HUTCHINSON[3.81] - UPDATE EXISTING HOURLY RATE FOR A CELL AND PART

    HUTCHINSON[4] - APPLICATION

========================================================================== */

/* =======================================================================
    HUTCHINSON[1] - SETUP
    - Gather what we require for Node
    - Initialization functions
========================================================================== */

/* =======================================================================
    HUTCHINSON[1.1] - VARIABLES
========================================================================== */
var express = require('express');
var https = require('https');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var multiline = require('multiline');
var mysql = require('mysql');
var net = require('net');
var fs = require('fs');
var multipart = require('connect-multiparty');
var mkdirp = require('mkdirp');

var router = express.Router();
var app = express();

var dir_path = 'public/';

var cell_status = {};

app.engine('html', ejs.renderFile);

app.use( bodyParser.json() );

app.use(multipart({
    uploadDir: __dirname + '/public/images/'
}));

app.set('views', __dirname + '/public/admin/');

console.log('\nStarting in:\n%s', path.join(__dirname, dir_path));

/* =======================================================================
    HUTCHINSON[1.2] - FUNCTIONS
========================================================================== */

/* =======================================================================
    HUTCHINSON[1.2.1] - GET ALL FILES FROM FOLDER FUNCTION
    - Gets list of all files within a specified folder
========================================================================== */
var _getAllFilesFromFolder = function(dir) {
    var filesystem = require("fs");
    var results = [];
    filesystem.readdirSync(dir).forEach(function(file) {
        file = dir+'/'+file;
        var stat = filesystem.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file))
        } else results.push(file);
    });
    return results;
};

/* =======================================================================
    HUTCHINSON[1.2.2] - GET ALL FOLDERS FROM FOLDER FUNCTION
    - Gets list of all folders within a specified folder
========================================================================== */
var _getAllFoldersFromFolder = function(dir) {
    var filesystem = require("fs");
    var results = [];
    filesystem.readdirSync(dir).forEach(function(file) {
        file = dir+'/'+file;
        var stat = filesystem.statSync(file);
        if (stat && stat.isDirectory()) {
            //results.push(file);
            results = results.concat(_getAllFilesFromFolder(file));
        };
    });
    return results;
};

/* =======================================================================
    HUTCHINSON[1.2.3] - FORMAT STRING TO KEY/VALUE FUNCTION
    - Format content into key/value pairs
========================================================================== */
String.prototype.format = function() {
    var args = arguments;
    this.unkeyed_index = 0;
    return this.replace(/\{(\w*)\}/g, function(match, key) {
        if (key === '') {
            key = this.unkeyed_index;
            this.unkeyed_index++
        }
        if (key == +key) {
            return args[key] !== 'undefined'
                ? args[key]
                : match;
        } else {
            for (var i = 0; i < args.length; i++) {
                if (typeof args[i] === 'object' && typeof args[i][key] !== 'undefined') {
                    return args[i][key];
                }
            }
            return match;
        }
    }.bind(this));
};

/* =======================================================================
    HUTCHINSON[1.2.4] - FORMAT SQL TO KEY/VALUE FUNCTIONS
    - Format content into key/value pairs
========================================================================== */
String.prototype.formatSQL = function() {
    var args = arguments;
    this.unkeyed_index = 0;
    return this.replace(/\{(\w*)\}/g, function(match, key) {
        if (key === '') {
            key = this.unkeyed_index;
            this.unkeyed_index++
        }
        if (key == +key) {
            return args[key] !== 'undefined'
                ? mysql.escape( args[key] )
                : match;
        } else {
            for (var i = 0; i < args.length; i++) {
                if (typeof args[i] === 'object' && typeof args[i][key] !== 'undefined') {
                    return mysql.escape( args[i][key] );
                }
            }
            return match;
        }
    }.bind(this));
}

var getKeys = function(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
}

/* =======================================================================
    HUTCHINSON[2] - CONFIGURATION
========================================================================== */

var connection;

handleDisconnect();

function handleDisconnect() {
    // connection = mysql.createConnection({
    //     user : 'root',
    //     password : 'root',
    //     database : 'smartplant',
    //     socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
    // });
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'ind_maint',
        password : 'zJC2LKjN6XHq5ETX',
        database : 'smartplant',
        multipleStatements : true
    });

    connection.connect(function(err) {
        if (err) {
            console.log('db_connection_err ', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    connection.query('USE `smartplant`', function (err) {
        if (err) {
            throw err;
            console.log('Query "USE smartplant" failed');
        };
    });

    connection.query("SELECT * FROM  `smartplant`.`cell`",
        function (err, result) {
            if (err) throw err;
            //console.log('cells result=' + JSON.stringify(result));
            for (i=0; i<result.length; i++){
                cell_status[result[i].name] = {users:[]};
            };
            //console.log('cell_status = '+JSON.stringify( cell_status ));
        }
    );

    connection.on('error', function(err) {
        console.log('db error ', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

/* =======================================================================
    HUTCHINSON[3] - APPLICATION CALLS TO DATABASE
========================================================================== */

/* =======================================================================
    HUTCHINSON[3.1] - GET CHILD PARTS FROM PARENT ID
========================================================================== */
app.post('/bom_part2', function (req, res) {
//  var sql = "SELECT `part`.`number`, `part`.`desc` FROM `part_relation` LEFT JOIN `part` ON `part`.`id`=`part_relation`.`child_id` WHERE `part_relation`.`parent_id` = (SELECT id FROM  `smartplant`.`part` WHERE `number`={part_number})".formatSQL(req.body);
    var sql = "SELECT `part`.`id`, `part`.`number`, `part`.`desc` FROM `part_relation` LEFT JOIN `part` ON `part`.`id`=`part_relation`.`child_id` WHERE `part_relation`.`parent_id` = {part_number};".formatSQL(req.body);
    console.log( sql );
    connection.query(sql, function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
    });
});

/* =======================================================================
    HUTCHINSON[3.2] - ADD TO PARTS QUEUE
========================================================================== */
app.post('/order_up', function (req, res) {
    var sql = "INSERT INTO  `smartplant`.`order_queue` (`cell_id` ,`part_id`) VALUES ((SELECT id FROM `smartplant`.`cell` WHERE `name`={cell_name}),  (SELECT id FROM  `smartplant`.`part` WHERE `number`={part_number}));".formatSQL(req.body);
    console.log( sql );
    connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log( JSON.stringify(result) );
            res.send(JSON.stringify(result));
    });
});

/* =======================================================================
    HUTCHINSON[3.3] - ORDER COMPLETE
========================================================================== */
app.post('/order_complete', function (req, res) {
    console.log( JSON.stringify( req.body ) );
    connection.query("delete from `order_queue` where `id` = ?", [/*req.body.cell_name, */req.body.queue_id],
        function (err, result) {
            try {
                if (err) throw err;
                res.send(JSON.stringify( result ));
            } catch (err) {
                res.send(JSON.stringify(err));
            }
        });
});

/* =======================================================================
    HUTCHINSON[3.4] - GET PART QUEUE BASED ON CELL
========================================================================== */
app.post('/get_cell_queue', function (req, res) {
    var sql ="SELECT t1.`id`, t2.`name`, `part`.`number`, `part`.`desc` FROM `order_queue`AS t1 INNER JOIN `cell` AS t2 ON t2.`id` = t1.`cell_id` INNER JOIN `part` ON `part`.`id`=t1.`part_id` WHERE t1.`cell_id` = (SELECT id FROM `smartplant`.`cell` WHERE `name`= {cell_name})".formatSQL(req.body);
    console.log( sql );
    connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log( JSON.stringify(result) );
            res.send(JSON.stringify(result));
    });
});

/* =======================================================================
    HUTCHINSON[3.5] - GET PART QUIZ
========================================================================== */
app.post('/get_part_quiz', function (req, res) {
    var sql ="SELECT * FROM `quiz` WHERE `part_id` = {part_id}".formatSQL(req.body);
    console.log( sql );
    connection.query(sql, function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
    });
});

/* =======================================================================
    HUTCHINSON[3.6] - GET LIST OF LOGGED IN USERS
========================================================================== */
app.post('/get_logged_in_users', function (req, res) {
    var sql = "SELECT t2.`login_id`, t2.`name` AS 'name', t2.`badge`, t2.`image_path`, t3.privilege FROM `user_run_status` as t1 INNER JOIN `user` AS t2 ON t2.`id` = t1.`login_id` INNER JOIN `user_privilege_def` AS t3 ON t3.`id` = t1.`privilege_id`".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,

        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.7] - GET LIST OF ALL USERS
========================================================================== */
app.post('/get_users', function (req, res) {
    var sql = "SELECT t1.`id`, t1.`name`, t1.`badge`, t1.`image_path`, t3.`privilege` FROM `user` as t1 INNER JOIN `user_privilege` as t2 ON t1.`id` = t2.`user_id` INNER JOIN `user_privilege_def` as t3 ON t3.`id` = t2.`privilege_id`".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,

        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.8] - GET USER ROLES
========================================================================== */
app.post('/get_privilege', function (req, res) {
    var sql = "SELECT * FROM `user_privilege_def`".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,

        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.9] - GET ALL PARTS
========================================================================== */
app.post('/get_part', function (req, res) {
    var sql = "SELECT * FROM `part`".formatSQL(req.body);
    connection.query(sql,

        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.10] - ADD NEW PART
========================================================================== */
app.post('/add_part', function (req, res) {
    var sql = "INSERT INTO `smartplant`.`part` (`id`, `number`, `desc`) VALUES (NULL, {part_number}, {part_desc});".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,

        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.11] - ADD PART RELATIONSHIP
========================================================================== */
app.post('/add_part_relation', function (req, res) {
    var sql = "INSERT INTO `smartplant`.`part_relation` (`parent_id`, `child_id`) VALUES ( {part_parent_id} , {part_child_id});".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,

        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.12] - REMOVE PART RELATIONSHIP
========================================================================== */
app.post('/remove_part_relation', function (req, res) {
    var sql = "DELETE FROM `smartplant`.`part_relation` WHERE child_id={remove_part_id}".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,

        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.13] - DELETE PART
    - this removes part from plant and also deletes all of its relationships
========================================================================== */
app.post('/remove_part', function (req, res) {
    var sql = "Delete t1, t2 from `smartplant`.`part` as t1 LEFT JOIN  `smartplant`.`part_relation` as t2 on t1.id = t2.parent_id or t1.id=t2.child_id WHERE t1.id={remove_part_id}".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,

        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
})

/* =======================================================================
    HUTCHINSON[3.14] - GET BOX SCHEDULE BASED ON CELL
========================================================================== */
app.post('/get_cell_box_schedule', function (req, res) {
    var sql = "SELECT t1.`id`, t1.`cell_id`, (SELECT `name` FROM `cell` WHERE `id` = {cell_id}) AS 'cell_name', t1.`part_id`, t1.`quantity`, t1.`consumed`, t1.`comment`, t2.`number` AS 'name' FROM `box_schedule` as t1 INNER JOIN `part` as t2 ON t2.`id` = t1.`part_id` WHERE `cell_id` = {cell_id} AND `complete` = 0 ORDER BY t1.`display_order`".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,

        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.15] - INCREMENT COMPLETED BOXES (BOX SCHEDULE)
========================================================================== */
app.post('/box_schedule_increment', function (req, res) {
    var sql = "UPDATE `box_schedule` SET `consumed` = `consumed` + 1 WHERE `id`= {queue_id} ".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,

        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.16] - DECREMENT COMPLETED BOXES (BOX SCHEDULE)
========================================================================== */
app.post('/box_schedule_decrement', function (req, res) {
    var sql = "UPDATE `box_schedule` SET `consumed` = CASE WHEN `consumed` > 0 THEN `consumed` - 1 ELSE `CONSUMED` END WHERE `id`= {queue_id} ".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,

        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.17] - ADMIN INCREMENT AMOUNT OF BOXES (BOX SCHEDULE)
========================================================================== */
app.post('/admin_box_schedule_increment', function (req, res) {
    var sql = "UPDATE `box_schedule` SET `quantity` = `quantity` + 1 WHERE `id`= {queue_id} ".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,

        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.18] - ADMIN DECREMENT AMOUNT OF BOXES (BOX SCHEDULE)
========================================================================== */
app.post('/admin_box_schedule_decrement', function (req, res) {
    var sql = "UPDATE `box_schedule` SET `quantity` = CASE WHEN `quantity` > {num_consumed} THEN `quantity` - 1 ELSE `quantity` END WHERE `id`= {queue_id} ".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,

        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.19] - GET LIST OF PARENT PARTS
========================================================================== */
app.post('/get_parent_part', function (req, res) {
    var sql = "SELECT DISTINCT t1.parent_id AS 'id', t2.`number` AS 'name' FROM `part_relation` as t1 INNER JOIN `part` AS t2 ON t2.`id` = t1.`parent_id` ".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,

        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.20] - ADMIN ADD NEW USER
========================================================================== */
app.post('/add_new_user', function (req, res) {
    var sql = "INSERT INTO `smartplant`.`user` (`name`, `badge`, `image_path`) VALUES ({user_name}, {badge_number}, {path_to_image});".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.21] - ADMIN ADD USER PRIVILEGE
========================================================================== */
app.post('/add_new_user_privilege', function (req, res) {
    var sql = "INSERT INTO `smartplant`.`user_privilege` (`user_id`, `privilege_id`) VALUES ((SELECT `id` FROM `smartplant`.`user` WHERE `badge` = {badge_number}), {privilege_id});".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

// app.post('/upload_user_image', function(req, res) {
//     console.log(JSON.stringify(req.files));
// });

/* =======================================================================
    HUTCHINSON[3.22] - GET CELL STATUS
========================================================================== */
app.post('/cell_status_in', function (req, res) {
    //connection.query("SELECT * FROM `smartplant`.`cell_status_in` AS t1 INNER JOIN `smartplant`.`cell` as t2 ON `t1`.`cell_id` = `t2`.`id`",
    connection.query("SELECT * FROM `smartplant`.`cell_status_in`",
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.23] - GET TRAINING IMAGE FOLDERS
========================================================================== */
app.post('/get_training_image_folders', function (req, res) {
    var sql = "SELECT * FROM `training_instruction` WHERE `cell_id` = {cell_id}".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(_getAllFilesFromFolder(__dirname+"/public"+result[0].folder_path)));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.24] - GET USER
========================================================================== */
 app.post('/get_user', function (req, res) {
     // query examples:
     // SELECT * FROM `user` WHERE `badge`=(SELECT `value` FROM `cell_status_in` WHERE `cell_id`=(SELECT id FROM `cell` WHERE `name`='DF5') AND `label`='badge')
     // SELECT * FROM  `user` WHERE  `badge` LIKE  (SELECT `value` FROM `cell_status_in` WHERE `cell_id`=(SELECT id FROM `cell` WHERE `name`='DF5') AND `label`='badge')
     // SELECT *  FROM `user` WHERE `badge` LIKE (SELECT `cell_status_in`.`value` FROM `cell_status_in` INNER JOIN `cell` ON `cell_status_in`.`cell_id`=`cell`.`id` WHERE `cell`.`name`='DF5' AND `cell_status_in`.`label`='badge')
     //SELECT * FROM `cell_status_in` INNER JOIN `cell` ON `cell_status_in`.`cell_id`=`cell`.`id` INNER JOIN `user` ON `cell_status_in`.`value` LIKE `user`.`badge` WHERE `cell`.`name`='DF5' AND `cell_status_in`.`label`='badge'
     //SELECT * FROM `cell_status_in` INNER JOIN `user` ON `cell_status_in`.`value` LIKE `user`.`badge`
     //SELECT * FROM `user` RIGHT JOIN `cell_status_in` ON `user`.`badge` LIKE `cell_status_in`.`value`
     //SELECT * FROM `cell_status_in` RIGHT JOIN `user` ON '%' + `user`.`badge` + '%'  LIKE `cell_status_in`.`value`
     //SELECT * FROM `cell_status_in` as t2  INNER JOIN  `user` as t1 ON  t2.`value` = t1.`badge`
     //SELECT t2.`name` FROM `cell_status_in` as t1  INNER JOIN  `user` as t2 ON  t1.`value` = t2.`badge` LEFT JOIN `cell` AS t3 ON t1.`cell_id`=t3.`id` WHERE t3.`name` = 'DF5' AND t1.`label`='badge'
     // "SELECT t2.`name` FROM `smartplant`.`cell_status_in` as t1  INNER JOIN  `smartplant`.`user` as t2 ON  t1.`value` = t2.`badge` LEFT JOIN `smartplant`.`cell` AS t3 ON t1.`cell_id`=t3.`id` WHERE t3.`name` = ? AND t1.`label`='badge'"
     var sql = "SELECT * FROM `user` WHERE `badge`= {badge_number}".formatSQL(req.body);
	 connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
 });

/* =======================================================================
    HUTCHINSON[3.25] - GET BADGE NUMBER
========================================================================== */
 app.post('/get_badge', function (req, res) {
    var sql = "SELECT value FROM `cell_status_in` WHERE `item_id` = 173";
    console.log( sql );
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

 /* =======================================================================
    HUTCHINSON[3.26] - GET USER BY BADGE (PRIVILEGE)
========================================================================== */
app.post('/get_user_by_badge', function (req, res) {
    var sql = "SELECT t1.`id`, t1.`name`, t1.`badge`, t1.`image_path`, t2.`privilege_id`, t2.`id` FROM `user` AS t1 INNER JOIN `user_privilege` as t2 ON t1.`id` = t2.`user_id` WHERE t1.`badge` = {badge_number}".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.27] - GET CELL STATUS RUNNING PART
========================================================================== */
app.post('/cell_status_running_part', function (req, res) {
    //connection.query("SELECT * FROM `smartplant`.`cell_status_in` AS t1 INNER JOIN `smartplant`.`cell` as t2 ON `t1`.`cell_id` = `t2`.`id`",
    connection.query("SELECT value FROM `smartplant`.`cell_status_in` WHERE item_id = 168",
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.28] - GET PART ID FROM NUMBER
========================================================================== */
app.post('/get_part_id', function (req, res) {
    var sql = "SELECT `id` FROM `smartplant`.`part` WHERE `number` = {part_number}".formatSQL(req.body);
     connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
});

/* =======================================================================
    HUTCHINSON[3.29] - DELETE USER
========================================================================== */
app.post('/delete_user', function (req, res) {
    var sql = "DELETE FROM `user` WHERE `id` = {user_id} ".formatSQL(req.body);
        connection.query(sql,
            function (err, result) {
                if (err) throw err;
                var sql = "DELETE FROM `user_privilege` WHERE `user_id` = {user_id} ".formatSQL(req.body);
                connection.query(sql,
                     function (err, result) {
                         if (err) throw err;
                     }
                 );
                res.send(JSON.stringify(result));
            }
        );
});

/* =======================================================================
    HUTCHINSON[3.30] - SAVE USER ROLE ON EDIT
========================================================================== */
app.post('/save_user_role', function (req, res) {
    var sql = "UPDATE `user_privilege` SET `privilege_id` = {user_role_id} WHERE `user_id` = {user_id}".formatSQL(req.body);
     connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
});

/* =======================================================================
    HUTCHINSON[3.31] - GET CELLS
========================================================================== */
app.post('/get_cells', function (req, res) {
    var sql = "SELECT * FROM `cell`";
     connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
});

/* =======================================================================
    HUTCHINSON[3.32] - ADD BOX SCHEDULE
========================================================================== */
app.post('/add_box_schedule', function (req, res) {
    var sql = "INSERT INTO `smartplant`.`box_schedule` (`id`, `cell_id`, `part_id`, `quantity`, `comment`, `display_order`) VALUES (NULL, {cell_id}, {part_id}, {box_quantity}, {comment}, {display_order});".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.33] - EDIT / ADD BOX SCHEDULE COMMENT
========================================================================== */
app.post('/box_schedule_comment', function (req, res) {
    var sql = "UPDATE `box_schedule` SET `comment` = {comment} WHERE `id` = {box_id}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.34] - COMPLETE BOX SCHEDULE
========================================================================== */
app.post('/box_schedule_complete', function (req, res) {
    var sql = "UPDATE `box_schedule` SET `complete` = 1, `admin_id_completed` = {admin_id}, `admin_completed_time` = NOW() WHERE `id` = {queue_id}".formatSQL(req.body);
    console.log( sql );
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.35] - ADD QUIZ QUESTION
========================================================================== */
app.post('/get_all_quiz_questions', function (req, res) {
    var sql = "SELECT `id`, `part_id`, (SELECT `number` FROM `part` WHERE `id` = `part_id`) AS 'part_number', `cell_id`, (SELECT `name` FROM `cell` WHERE `id` = `cell_id`) AS 'cell_name', `question`, `answer_correct`, `answer_1`, `answer_2`, `answer_3`, `answer_4`, `image_path`, `category` FROM `quiz`;".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.36] - ADD QUIZ QUESTION PART
========================================================================== */
app.post('/add_quiz_question_part', function (req, res) {
    var sql = "INSERT INTO `smartplant`.`quiz` (`part_id`, `question`, `answer_correct`, `answer_1`, `answer_2`, `answer_3`, `answer_4`, `image_path`, `category`) VALUES ({part_id}, {question}, {answer_correct}, {answer_1}, {answer_2}, {answer_3}, {answer_4}, {image_path}, {category});".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.37] - ADD QUIZ QUESTION CELL
========================================================================== */
app.post('/add_quiz_question_cell', function (req, res) {
    var sql = "INSERT INTO `smartplant`.`quiz` (`cell_id`, `question`, `answer_correct`, `answer_1`, `answer_2`, `answer_3`, `answer_4`, `image_path`, `category`) VALUES ({cell_id}, {question}, {answer_correct}, {answer_1}, {answer_2}, {answer_3}, {answer_4}, {image_path}, {category});".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.38] - ADD QUIZ QUESTION PART CELL
========================================================================== */
app.post('/add_quiz_question_part_cell', function (req, res) {
    var sql = "INSERT INTO `smartplant`.`quiz` (`part_id`, `cell_id`, `question`, `answer_correct`, `answer_1`, `answer_2`, `answer_3`, `answer_4`, `image_path`, `category`) VALUES ({part_id}, {cell_id}, {question}, {answer_correct}, {answer_1}, {answer_2}, {answer_3}, {answer_4}, {image_path}, {category});".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.39] - DELETE QUIZ QUESTION
========================================================================== */
app.post('/delete_quiz_question', function (req, res) {
    var sql = "DELETE FROM `quiz` where `id` = {question_id}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.40] - GET ADMIN LOGIN
========================================================================== */
app.post('/get_admin_login', function (req, res) {
    var sql = "SELECT * FROM `smartplant`.`admin_login` WHERE `username` = {username}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.41] - ADD USER IMAGE UPLOAD
========================================================================== */
app.post('/user_image_upload', function (req, res, next) {
    var data = req.body.type;
    var operatorPath = path.normalize('../operator/public/images/users/');
    var dashboardPath = path.normalize('../dashboard/public/images/users/');
    var file = req.files.file;

    console.log(file.name); //original name (ie: sunset.png)
    console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
    console.log(operatorPath); //uploads directory: (ie: /home/user/data/uploads)

    // Copy Upload to Operator/Images/Users
    fs.createReadStream(file.path).pipe(fs.createWriteStream(operatorPath + file.name));

    // Copy Upload to Dashboard/Images/Users
    fs.createReadStream(file.path).pipe(fs.createWriteStream(dashboardPath + file.name));

    // Move Upload to Admin/Images/Users
    fs.rename(file.path, 'public/images/users/' + file.name, function (err) {
      if (err) throw err;
      console.log('renamed complete');
      res.end();
    });
});

/* =======================================================================
    HUTCHINSON[3.42] - ADD QUALITY ALERTS
========================================================================== */
app.post('/add_quality_alert', function (req, res) {
    var sql = "INSERT INTO `smartplant`.`quality_alerts` (`cell_id`, `part_id`, `description`, `expires`, `image_path`) VALUES ({cell_id}, {part_id}, {description}, {expires}, {image_path});".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.43] - QUALITY ALERT IMAGE UPLOAD
========================================================================== */
app.post('/quality_alert_image_upload', function (req, res, next) {
    var data = req.body.type;
    var uploadPath = path.normalize('../operator/public/images/quality-alerts/');
    var file = req.files.file;

    console.log(file.name); //original name (ie: sunset.png)
    console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
    console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)

    fs.createReadStream(file.path).pipe(fs.createWriteStream(uploadPath + file.name));

    fs.rename(file.path, 'public/images/quality-alerts/' + file.name, function (err) {
      if (err) throw err;
      console.log('renamed complete');
      res.end();
    });
});

/* =======================================================================
    HUTCHINSON[3.44] - DELETE QUALITY ALERT
========================================================================== */
app.post('/delete_quality_alert', function (req, res) {
    var sql = "DELETE FROM `quality_alerts` where `id` = {alert_id}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.45] - GET ALL QUALITY ALERTS
========================================================================== */
app.post('/get_quality_alerts', function (req, res) {
    var sql = "SELECT `id`, `cell_id`, (SELECT `name` FROM `cell` WHERE `id` = `cell_id`) AS 'cell_name', `part_id`, (SELECT `number` FROM `part` WHERE `id` = `part_id`) AS 'part_number', `expires`, `description`, `image_path` FROM `quality_alerts` ORDER BY `expires` DESC".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.46] - QUIZ QUESTION IMAGE UPLOAD
========================================================================== */
app.post('/quiz_question_image_upload', function (req, res, next) {
    var data = req.body.type;
    var uploadPath = path.normalize('../operator/public/images/quiz/questions/');
    var file = req.files.file;

    console.log(file.name); //original name (ie: sunset.png)
    console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
    console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)

    fs.createReadStream(file.path).pipe(fs.createWriteStream(uploadPath + file.name));

    fs.rename(file.path, 'public/images/quiz/questions/' + file.name, function (err) {
      if (err) throw err;
      console.log('renamed complete');
      res.end();
    });
});

/* =======================================================================
    HUTCHINSON[3.47] - GET PART NAME FROM PART ID
========================================================================== */
app.post('/get_part_name_from_id', function (req, res) {
    var sql = "SELECT `number` FROM `smartplant`.`part` WHERE `id` = {part_id}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.48] - GET CELL NAME FROM CELL ID
========================================================================== */
app.post('/get_cell_name_from_id', function (req, res) {
    var sql = "SELECT `name` FROM `smartplant`.`cell` WHERE `id` = {cell_id}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.49] - GET QUALITY ALERT BY ID
========================================================================== */
app.post('/get_quality_alert_by_id', function (req, res) {
    var sql = "SELECT * FROM `smartplant`.`quality_alerts` WHERE `id` = {alert_id}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.50] - UPDATE QUALITY ALERT
========================================================================== */
app.post('/update_quality_alert', function (req, res) {
    var sql = "UPDATE `smartplant`.`quality_alerts` SET `cell_id` = {cell_id}, `part_id` = {part_id}, `expires` = {expires}, `description` = {description}, `image_path` = {image_path} WHERE `id` = {alert_id}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.51] - GET QUIZ QUESTION BY ID
========================================================================== */
app.post('/get_quiz_question_by_id', function (req, res) {
    var sql = "SELECT * FROM `smartplant`.`quiz` WHERE `id` = {question_id}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.52] - UPDATE QUIZ QUESTION - PART & CELL SPECIFIC
========================================================================== */
app.post('/update_quiz_question', function (req, res) {
    var sql = "UPDATE `smartplant`.`quiz` SET `part_id` = {part_id}, `cell_id` = {cell_id}, `question` = {question}, `answer_correct` = {answer_correct}, `answer_1` = {answer_1}, `answer_2` = {answer_2}, `answer_3` = {answer_3}, `answer_4` = {answer_4}, `category` = {category}, `image_path` = {image_path} WHERE `id` = {question_id}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.53] - GET USER PERMISSIONS
========================================================================== */
app.post('/get_user_permissions', function (req, res) {
    var sql = "SELECT `id`, `cell_id`, (SELECT `name` FROM `cell` WHERE `id` = `cell_id`) AS 'cell_name', `part_id`, (SELECT `number` FROM `part` WHERE `id` = `part_id`) AS 'part_number', `user_id`, `privilege_id`, `timestamp` FROM `user_training` WHERE `user_id` = {user_id};".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.54] - ADD USER PERMISSION
========================================================================== */
app.post('/add_user_permission', function (req, res) {
    var sql = "INSERT INTO `smartplant`.`user_training` (`cell_id`, `part_id`, `user_id`, `privilege_id`, `timestamp`) VALUES ({cell_id}, {part_id}, {user_id}, (SELECT `privilege_id` FROM `smartplant`.`user_privilege` WHERE `user_id` = {user_id}), NOW());".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.55] - DELETE USER PERMISSION
========================================================================== */
app.post('/delete_user_permission', function (req, res) {
    var sql = "DELETE FROM `user_training` WHERE `id` = {permission_id}".formatSQL(req.body);
    console.log(sql);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.56] - GET BADGE SWIPES
========================================================================== */
app.post('/get_badge_swipes', function (req, res) {
    var sql = "SELECT `item_id`, `label`, `value`, `cell_id`, `cell_name` FROM `smartplant`.`cell_status_in` WHERE `label` = 'badge'".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.57] - GET PART BY NUMBER
========================================================================== */
app.post('/get_part_by_number', function (req, res) {
    var sql = "SELECT * FROM `smartplant`.`part` WHERE `number` = {part_number}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.57] - GET PART BY ID
========================================================================== */
app.post('/get_part_by_id', function (req, res) {
    var sql = "SELECT * FROM `smartplant`.`part` WHERE `id` = {part_id}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.57] - GET PART BY ID
========================================================================== */
app.post('/edit_part_by_id', function (req, res) {
    var sql = "UPDATE `smartplant`.`part` SET `number` = {part_number}, `desc` = {part_description} WHERE `id` = {part_id};".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.58] - CHECK IF BADGE EXISTS IN DATABASE
========================================================================== */
app.post('/check_badge', function (req, res) {
    var sql = "SELECT `badge` FROM `smartplant`.`user` WHERE `badge` = {badge}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.59] - GET USER BY ID
========================================================================== */
app.post('/get_user_by_id', function (req, res) {
    var sql = "SELECT t1.id, t1.name, t1.image_path, t1.badge, t3.id AS privilege_id, t3.privilege FROM user AS t1 INNER JOIN user_privilege AS t2 ON t1.id = t2.user_id INNER JOIN user_privilege_def AS t3 ON t2.privilege_id = t3.id WHERE t1.id = {user_id}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.60] - UPDATE USER IMAGE
========================================================================== */
app.post('/edit_user_image_path', function (req, res) {
    var sql = "UPDATE `smartplant`.`user` SET `image_path` = {image_path} WHERE `id` = {user_id}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.60] - UPDATE USER BADGE
========================================================================== */
app.post('/edit_user_badge', function (req, res) {
    var sql = "UPDATE `smartplant`.`user` SET `badge` = {badge} WHERE `id` = {user_id}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.61] - GET COMPLETED ORDERS
========================================================================== */
app.post('/get_completed_orders', function (req, res) {
    var sql = "SELECT t1.`id`, t1.`cell_id`, t1.`part_id`, t1.`quantity`, t1.`consumed`, t1.`admin_completed_time`, t2.`name` AS cell_name, t3.`number` AS part_name, t4.`username` FROM `box_schedule` AS t1 INNER JOIN `cell` AS t2 ON t1.`cell_id` = t2.`id` INNER JOIN `part` AS t3 ON t1.`part_id` = t3.`id` INNER JOIN `admin_login` AS t4 ON t1.`admin_id_completed` = t4.`id` WHERE t1.`complete` = 1 ORDER BY t1.`admin_completed_time` DESC".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.62] - WORK INSTRUCTION IMAGE UPLOAD
========================================================================== */
app.post('/work_instruction_image_upload', function (req, res, next) {
    mkdirp('public/images/training/'+req.body.cell+'/'+req.body.part, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            mkdirp('../operator/public/images/training/'+req.body.cell+'/'+req.body.part, function(err) {
                if (err) {
                    console.log(err);
                }
                else {
                    var uploadPath = path.normalize('../operator/public/images/training/'+req.body.cell+'/'+req.body.part+'/');
                    var file = req.files.file;

                    console.log(file.name); //original name (ie: sunset.png)
                    console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
                    console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)

                    var source = fs.createReadStream(file.path);
                    var dest = fs.createWriteStream(uploadPath + file.name);

                    source.on('end', function() {
                        console.log('Copy to Admin Successful.');
                    });
                    source.on('error', function(err) {
                        console.log(err);
                    });

                    source.pipe(dest);

                    fs.rename(file.path, 'public/images/training/'+req.body.cell+'/'+req.body.part+'/'+ file.name, function (err) {
                        if (err) {
                            console.log(err);
                            res.end();
                        }
                        else {
                            console.log('renamed complete');
                            res.end();
                        }
                    });
                }
            });
        }
    });
});

/* =======================================================================
    HUTCHINSON[3.63] - ADD WORK INSTRUCTION
========================================================================== */
app.post('/add_work_instruction', function (req, res) {
    var sql = "INSERT INTO `smartplant`.`training_instruction` (`cell_id`, `part_id`, `image_path`, `display_order`) VALUES ((SELECT `id` FROM `cell` WHERE name = {cell_name}), (SELECT `id` FROM `part` WHERE number = {part_name}), {image_path}, {display_order});".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.64] - GET CURRENT WORK INSTRUCTION IMAGES
========================================================================== */
app.post('/get_current_images', function (req, res) {
    var sql = "SELECT `id`, `image_path`, `display_order` FROM `smartplant`.`training_instruction` WHERE `cell_id` = (SELECT `id` FROM `cell` WHERE name = {cell_name}) AND `part_id` = (SELECT `id` FROM `part` WHERE number = {part_name}) ORDER BY `display_order` ASC;".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.65] - UPDATE WORK INSTRUCTION ORDER
========================================================================== */
app.post('/update_work_instruction_order', function (req, res) {
    var sql = "UPDATE `smartplant`.`training_instruction` SET `display_order` = {new_display_order} WHERE `id` = {image_id};".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.66] - DELETE WORK INSTRUCTION IMAGE
========================================================================== */
app.post('/delete_work_instruction_image', function (req, res) {
    var sql = "DELETE FROM `smartplant`.`training_instruction` WHERE `id` = {image_id};".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.62] - BOUNDARY SAMPLE IMAGE UPLOAD
========================================================================== */
app.post('/boundary_sample_image_upload', function (req, res, next) {
    mkdirp('public/images/boundary-samples/'+req.body.cell+'/'+req.body.part, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            mkdirp('../operator/public/images/boundary-samples/'+req.body.cell+'/'+req.body.part, function(err) {
                if (err) {
                    console.log(err);
                }
                else {
                    var uploadPath = path.normalize('../operator/public/images/boundary-samples/'+req.body.cell+'/'+req.body.part+'/');
                    var file = req.files.file;

                    console.log(file.name); //original name (ie: sunset.png)
                    console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
                    console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)

                    var source = fs.createReadStream(file.path);
                    var dest = fs.createWriteStream(uploadPath + file.name);

                    source.on('end', function() {
                        console.log('Copy to Admin Successful.');
                    });
                    source.on('error', function(err) {
                        console.log(err);
                    });

                    source.pipe(dest);

                    fs.rename(file.path, 'public/images/boundary-samples/'+req.body.cell+'/'+req.body.part+'/'+ file.name, function (err) {
                        if (err) {
                            console.log(err);
                            res.end();
                        }
                        else {
                            console.log('renamed complete');
                            res.end();
                        }
                    });
                }
            });
        }
    });
});

/* =======================================================================
    HUTCHINSON[3.63] - ADD BOUNDARY SAMPLE
========================================================================== */
app.post('/add_boundary_sample', function (req, res) {
    var sql = "INSERT INTO `smartplant`.`boundary_samples` (`cell_id`, `part_id`, `image_path`, `display_order`) VALUES ((SELECT `id` FROM `cell` WHERE name = {cell_name}), (SELECT `id` FROM `part` WHERE number = {part_name}), {image_path}, {display_order});".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.64] - GET CURRENT BOUNDARY SAMPLE IMAGES
========================================================================== */
app.post('/get_current_boundary_sample_images', function (req, res) {
    var sql = "SELECT `id`, `image_path`, `display_order` FROM `smartplant`.`boundary_samples` WHERE `cell_id` = (SELECT `id` FROM `cell` WHERE name = {cell_name}) AND `part_id` = (SELECT `id` FROM `part` WHERE number = {part_name}) ORDER BY `display_order` ASC;".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.65] - UPDATE BOUNDARY SAMPLE ORDER
========================================================================== */
app.post('/update_boundary_sample_order', function (req, res) {
    var sql = "UPDATE `smartplant`.`boundary_samples` SET `display_order` = {new_display_order} WHERE `id` = {image_id};".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.66] - DELETE WORK INSTRUCTION IMAGE
========================================================================== */
app.post('/delete_boundary_sample_image', function (req, res) {
    var sql = "DELETE FROM `smartplant`.`boundary_samples` WHERE `id` = {image_id};".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.67] - GET ADMIN PRIVILEGES
========================================================================== */
app.post('/get_admin_roles', function (req, res) {
    var sql = "SELECT * FROM `smartplant`.`admin_roles` WHERE `user_id` = {user_id};".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.68] - UPDATE BOX SCHEDULE ORDER
========================================================================== */
app.post('/update_box_schedule_order', function (req, res) {
    var sql = "UPDATE `smartplant`.`box_schedule` SET `display_order` = {new_display_order} WHERE `id` = {image_id};".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.69] - GET PROCESS VERIFICATION
========================================================================== */
app.post('/get_process_verification', function (req, res) {
    var sql = "SELECT * FROM `smartplant`.`process_verification` WHERE `cell_id` = {cell_id} AND `part_id` = {part_id} ORDER BY `display_order`".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.69] - GET PROCESS VERIFICATION
========================================================================== */
app.post('/get_operator_process_verification', function (req, res) {
    var sql = "SELECT * FROM `smartplant`.`operator_process_verification` WHERE `cell_id` = {cell_id} AND `part_id` = {part_id} ORDER BY `display_order`".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.70] - ADD PROCESS VERIFICATION
========================================================================== */
app.post('/add_process_verification', function (req, res) {
    var sql = "INSERT INTO `smartplant`.`process_verification` (`cell_id`, `part_id`, `question_type`, `question`, `display_order`) VALUES ({cell_id}, {part_id}, {question_type}, {question}, {display_order})".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.70] - ADD PROCESS VERIFICATION
========================================================================== */
app.post('/add_operator_process_verification', function (req, res) {
    var sql = "INSERT INTO `smartplant`.`operator_process_verification` (`cell_id`, `part_id`, `question_type`, `question`, `display_order`) VALUES ({cell_id}, {part_id}, {question_type}, {question}, {display_order})".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.71] - UPDATE PROCESS VERIFICATION ORDER
========================================================================== */
app.post('/update_process_verification_order', function (req, res) {
    var sql = "UPDATE `smartplant`.`process_verification` SET `display_order` = {new_display_order} WHERE `id` = {process_id};".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.71] - UPDATE PROCESS VERIFICATION ORDER
========================================================================== */
app.post('/update_operator_process_verification_order', function (req, res) {
    var sql = "UPDATE `smartplant`.`operator_process_verification` SET `display_order` = {new_display_order} WHERE `id` = {process_id};".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.72] - GET PROCESS VERIFICATION BY ID
========================================================================== */
app.post('/get_process_verification_by_id', function (req, res) {
    var sql = "SELECT * FROM `smartplant`.`process_verification` WHERE `id` = {process_id}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.72] - GET PROCESS VERIFICATION BY ID
========================================================================== */
app.post('/get_operator_process_verification_by_id', function (req, res) {
    var sql = "SELECT * FROM `smartplant`.`operator_process_verification` WHERE `id` = {process_id}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.73] - EDIT PROCESS VERIFICATION
========================================================================== */
app.post('/edit_process_verification', function (req, res) {
    var sql = "UPDATE `smartplant`.`process_verification` SET `question` = {question}, `question_type` = {question_type} WHERE `id` = {process_id};".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.73] - EDIT PROCESS VERIFICATION
========================================================================== */
app.post('/edit_operator_process_verification', function (req, res) {
    var sql = "UPDATE `smartplant`.`operator_process_verification` SET `question` = {question}, `question_type` = {question_type} WHERE `id` = {process_id};".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.74] - DELETE PROCESS VERIFICATION
========================================================================== */
app.post('/delete_process_verification', function (req, res) {
    var sql = "DELETE FROM `smartplant`.`process_verification` WHERE `id` = {process_id};".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.74] - DELETE PROCESS VERIFICATION
========================================================================== */
app.post('/delete_operator_process_verification', function (req, res) {
    var sql = "DELETE FROM `smartplant`.`operator_process_verification` WHERE `id` = {process_id};".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.75] - UPDATE USER NAME
========================================================================== */
app.post('/update_user_name', function (req, res) {
    var sql = "UPDATE `smartplant`.`user` SET `name` = {user_name} WHERE `id` = {user_id};".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.76] - REMOVE BOX SCHEDULE FROM COMPLETED
========================================================================== */
app.post('/remove_order', function (req, res) {
    var sql = "DELETE FROM `smartplant`.`box_schedule` WHERE `id` = {remove_order_id};".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.77] - ACTIVATE BOX SCHEDULE FROM COMPLETED
========================================================================== */
app.post('/activate_order', function (req, res) {
    var sql = "UPDATE `smartplant`.`box_schedule` SET `complete` = 0, `consumed` = {consumed}, `display_order` = {display_order} WHERE `id` = {activate_order_id};".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.78] - GET COUNT OF BOX SCHEDULES FROM CELL
========================================================================== */
app.post('/get_order_count_by_cell', function (req, res) {
    var sql = "SELECT COUNT(`id`) AS row_count FROM `box_schedule` WHERE `cell_id` = {cell_id} AND `complete` = 0;".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.79] - INSERT NEW HOURLY RATE INFO FOR A CELL AND PART
========================================================================== */
app.post('/insert_hourly_rate', function(req, res){
    var sql = "INSERT INTO `smartplant`.`part_cell_relation`(`part_id`, `cell_id`, `rate`) VALUES ({part_id},{cell_id},{hourly_rate})".formatSQL(req.body);
    console.log( sql );
    connection.query(sql, function(err, result){
        if(err) throw err;
        res.send(JSON.stringify(result));
    });
});

/* =======================================================================
    HUTCHINSON[3.80] - GRAB EXISTING HOURLY RATE FOR A CELL AND PART
========================================================================== */
app.post('/get_hourly_rates', function (req, res) {
    var sql = ("SELECT t1.`id`, t1.`cell_id`, (SELECT `name` FROM `cell` WHERE `id` = {cell_id}) AS 'cell_name', t1.`part_id`, t1.`rate`, t2.`number` as 'name' " +
               "FROM `part_cell_relation` as t1 INNER JOIN `part` as t2 ON t2.`id` = t1.`part_id` WHERE t1.`cell_id` = {cell_id} ORDER BY t1.`rate`").formatSQL(req.body);

    console.log( sql );
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

/* =======================================================================
    HUTCHINSON[3.81] - UPDATE EXISTING HOURLY RATE FOR A CELL AND PART
========================================================================== */
app.post('/update_hourly_rate', function(req, res){
    //var sql = "UPDATE `box_schedule` SET `comment` = {comment} WHERE `id` = {box_id}".formatSQL(req.body);
    var sql = "UPDATE `smartplant`.`part_cell_relation` SET `rate` = {newRate} where `id` = {box_id}".formatSQL(req.body);
    console.log( sql );
    connection.query(sql, function(err, result){
        if(err) throw err;
        res.send(JSON.stringify(result));
    });
});


/* =======================================================================
    HUTCHINSON[3.6] - GET HOUR GRAPH DATA
========================================================================== */
app.post('/get_hour_graph_data', function(req, res) {
    var sql = "SELECT HOUR(`timestamp`) AS 'hour', DAY(`timestamp`) AS 'day', COUNT(*) as 'count' FROM `smartplant`.`part_made` WHERE `cell_id` = "+req.body.cell_id+" AND `timestamp` >= {past_day_start} AND `timestamp` <= {past_day_end} GROUP BY UNIX_TIMESTAMP(`timestamp`) DIV 3600;".formatSQL(req.body);
    console.log(sql);
    connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
});

/* =======================================================================
    HUTCHINSON[3.6] - GET HOUR GRAPH DATA BY CELL NAME
========================================================================== */
app.post('/get_hour_graph_data_cell_name', function(req, res) {
    var sql = "SELECT HOUR(`timestamp`) AS 'hour', DAY(`timestamp`) AS 'day', COUNT(*) as 'count' FROM `smartplant`.`part_made` WHERE `cell_id` = (SELECT `id` FROM `cell` WHERE `name` = '"+req.body.cell_name+"') AND `timestamp` >= {past_day_start} AND `timestamp` <= {past_day_end} GROUP BY UNIX_TIMESTAMP(`timestamp`) DIV 3600;".formatSQL(req.body);
    console.log(sql);
    connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
});

/* =======================================================================
    HUTCHINSON[3.6] - GET SECOND GRAPH DATA
========================================================================== */
app.post('/get_second_graph_data', function(req, res) {
    var sql = "SELECT MINUTE(`timestamp`) AS 'minute', HOUR(`timestamp`) AS 'hour', COUNT(*) as 'count' FROM `smartplant`.`part_made` WHERE `cell_id` = "+req.body.cell_id+" AND `timestamp` >= {past_hour_start} AND `timestamp` <= {past_hour_end} GROUP BY UNIX_TIMESTAMP(`timestamp`) DIV 60;".formatSQL(req.body);
    console.log(sql);
    connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
});

/* =======================================================================
    HUTCHINSON[3.7] - GET PAST 15 SECONDS OF DATA
========================================================================== */
app.post('/get_seconds_data', function(req, res) {
    var sql = "SELECT MINUTE(`timestamp`) AS 'minute', COUNT(*) as 'count' FROM `smartplant`.`part_made` WHERE `cell_id` = '"+req.body.cell_id+"' AND `timestamp` >= '"+req.body.beginning_of_hour+"' AND `timestamp` <= '"+req.body.current_seconds+"' GROUP BY UNIX_TIMESTAMP(`timestamp`) DIV 60;";
    console.log(sql);
    connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
});

/* =======================================================================
    HUTCHINSON[3.8] - GET PAST HOUR OF DATA
========================================================================== */
app.post('/get_past_hour_data', function(req, res) {
    var sql = "SELECT `timestamp`, COUNT(*) as 'count' FROM `smartplant`.`part_made` WHERE `cell_id` = "+req.body.cell_id+" AND `timestamp` >= '"+req.body.past_hour+"' GROUP BY UNIX_TIMESTAMP(`timestamp`) DIV 3600;";
    console.log(sql);
    connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
});

/* =======================================================================
    HUTCHINSON[3.8] - GET CELLS THAT HAVE STATUSES
========================================================================== */
app.post('/get_cells_with_status', function(req, res) {
    var sql = "SELECT `cell_name`, `value` FROM `smartplant`.`cell_status_in` WHERE `label` = 'cell_status';";
    console.log(sql);
    connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
});

/* =======================================================================
    HUTCHINSON[3.22] - GET CELL STATUS
========================================================================== */
app.post('/cell_status_in_dashboard', function (req, res) {
    //connection.query("SELECT * FROM `smartplant`.`cell_status_in` AS t1 INNER JOIN `smartplant`.`cell` as t2 ON `t1`.`cell_id` = `t2`.`id`",
    var sql = "SELECT * FROM `smartplant`.`cell_status_in` WHERE `cell_name` = {cell_name}".formatSQL(req.body);
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        }
    );
});

/* =======================================================================
    HUTCHINSON[3.8] - GET AGV POSITIONS
========================================================================== */
app.post('/get_agv_positions', function(req, res) {
    var sql = "SELECT * FROM `smartplant`.`agv_positions`;";
    console.log(sql);
    connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
});
/*================================================================================
HUTCHINSON LAYOUT PROGRAM (RITABAN)
================================================================================= */
app.post('/send_layout', function(req, res) {
    var db;

    db = mysql.createConnection({
        host     : '172.24.253.4',
        user     : 'ind_maint',
        password : 'zJC2LKjN6XHq5ETX',
        database : 'smartplant',
        multipleStatements : true
    });
     var x = req.body.name;
     var y = req.body.height;
     var z = req.body.width;
     var w = req.body.left;
     var p = req.body.top;
     var q=req.body.layout_date;
     var c=req.body.color;
/* var mysql = require('node-mysql');
var conn = mysql.createConnection({
    ...
});

var sql = "INSERT INTO Test (name, email, n) VALUES ?";
var values = [
    ['demian', 'demian@gmail.com', 1],
    ['john', 'john@gmail.com', 2],
    ['mark', 'mark@gmail.com', 3],
    ['pete', 'pete@gmail.com', 4]
];
conn.query(sql, [values], function(err) {
    if (err) throw err;
    conn.end();
});
*/      
       var values =[];
        for(var i= 0; i<x.length; i++){
             values[i] = [q,x[i] ,w[i],p[i],y[i],z[i],c[i]];
        }
        console.log(values); 
        var insertsql = " INSERT INTO `smartplant`.`layout_id`(`date`,`Name`, `left`, `top`, `height`, `width`, `state`) VALUES ?";
        db.query(insertsql,[values],
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
    
});
app.get('/get_layout_data', function(req, res) {
    var db;
    db = mysql.createConnection({
        host     : '172.24.253.4',
        user     : 'ind_maint',
        password : 'zJC2LKjN6XHq5ETX',
        database : 'smartplant',
        multipleStatements : true
    });
    var selectsql = "SELECT DATE_FORMAT(date,'%y-%m-%d') as `date`, DATEDIFF(date,NOW()) as `diff`, ID as ID, Name as Name, `left` as `left`, `top` as `top`, `height` as `height`, `width` as `width`, `state` as `state` FROM `smartplant`. `layout_id`;"
    //var sql = 'SELECT id as MSID, cell_id as CELLID, part_id as PARTID, counter as COUNTER, timestamp as TIMESTAMP, status as STATUS FROM `part_made` LIMIT 60000';
    db.query(selectsql,function(err,result){
        if (err) throw err;
        res.send(JSON.stringify(result));  
    });
});




/* =======================================================================
    HUTCHINSON[3.8] - GET BOX COMPLETED BY ID
========================================================================== */
app.post('/get_box_completed_by_id', function(req, res) {
    var sql = "SELECT `consumed` FROM `box_schedule` WHERE `id` = {box_id};".formatSQL(req.body);
    console.log(sql);
    connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
});

/* =======================================================================
    HUTCHINSON[3.8] - GET DOWNTIME HISTORY
========================================================================== */
app.post('/get_downtime_history', function(req, res) {
    var sql = "SELECT `id`, `cell_id`, (SELECT `name` FROM `cell` WHERE `id` = {cell_id}) AS 'cell_name', `reason`, `duration`, `timestamp` FROM `downtime_history` WHERE `cell_id` = {cell_id};".formatSQL(req.body);
    console.log(sql);
    connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
});

/* =======================================================================
    HUTCHINSON[3.8] - GET DOWNTIME REASONS
========================================================================== */
app.post('/get_downtime_reasons', function(req, res) {
    var sql = "SELECT `id`, `cell_id`, (SELECT `name` FROM `cell` WHERE `id` = {cell_id}) AS 'cell_name', `reason` FROM `downtime_reasons` WHERE `cell_id` = {cell_id};".formatSQL(req.body);
    console.log(sql);
    connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
});

/* =======================================================================
    HUTCHINSON[3.8] - ADD DOWNTIME REASONS
========================================================================== */
app.post('/add_downtime_reasons', function(req, res) {
    var sql = "INSERT INTO `smartplant`.`downtime_reasons` (`cell_id`, `reason`) VALUES ({cell_id}, {reason});".formatSQL(req.body);
    console.log(sql);
    connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
});

/* =======================================================================
    HUTCHINSON[3.8] - DELETE DOWNTIME REASONS
========================================================================== */
app.post('/delete_downtime_reasons', function(req, res) {
    var sql = "DELETE FROM `smartplant`.`downtime_reasons` WHERE `id` = {reason_id};".formatSQL(req.body);
    console.log(sql);
    connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
});

/* =======================================================================
    HUTCHINSON[3.8] - GET SINGLE DOWNTIME REASON
========================================================================== */
app.post('/get_single_downtime_reason', function(req, res) {
    var sql = "SELECT `reason` FROM `smartplant`.`downtime_reasons` WHERE `id` = {reason_id};".formatSQL(req.body);
    console.log(sql);
    connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
});

/* =======================================================================
    HUTCHINSON[3.8] - EDIT DOWNTIME REASONS
========================================================================== */
app.post('/edit_downtime_reason', function(req, res) {
    var sql = "UPDATE `smartplant`.`downtime_reasons` SET `reason` = {reason} WHERE `id` = {reason_id};".formatSQL(req.body);
    console.log(sql);
    connection.query(sql,
         function (err, result) {
             if (err) throw err;
             res.send(JSON.stringify(result));
         }
     );
});


// simple logger
app.use(function(req, res, next){
  console.log('Logging: %s %s %s', req.method, req.url, req.path);
  next();
});

//console.log('folders: %s', _getAllFoldersFromFolder(path.join(__dirname, dir_path)) );

var each = ["images","css",'js','flot','reveal.js','snap','sparkline','jquery','d3','datetimepicker','work_instructions', 'work_videos'];
for (var i=0;i<each.length;i++){
        app.use('/'+each[i]   , express.static(path.join(__dirname, dir_path + '/'+each[i])));
}

app.use(favicon(path.join(__dirname, dir_path + '/' + 'favicon.ico')));

// Respond
app.use('/', function(req, res, next){
    if (req.path == '/'){
        res.locals.query = req.query;
        res.render( path.join(__dirname, dir_path+'/index.html') );
    } else {
        res.render( path.join(__dirname, dir_path+req.path) );
    }
});

//app.use('/', routes);
//app.use('/users', users);

// listen (start app with node server.js) ======================================

//app.listen(8080);
http.createServer(app).listen(9081);

// keys_dir = 'keys/'
// options = {
        // key  : fs.readFileSync(keys_dir + 'privatekey.pem'),
        // ca   : fs.readFileSync(keys_dir + 'certauthority.pem'),
        // cert : fs.readFileSync(keys_dir + 'certificate.pem')
      // };
// https.createServer(options, app).listen(443);
console.log('app is listening at localhost:9081');



/*
var HOST = '172.24.253.155';
var PORT = 2813;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
    client.write('I am Chuck Norris!');

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {

    console.log('DATA: ' + data);
    // Close the client socket completely
    client.destroy();

});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});
*/



/* =======================================================================
    HUTCHINSON[3.82] - UNUSED
==========================================================================*/
// app.post('/memory', function (req, res) {
//     //connection.query("UPDATE  `cells`.`cell_status_in` SET  `Value` =  ? WHERE  `cell_status_in`.`label` =  'SmartPlant 01 Badge' LIMIT 1 ;", req.body.name,
//     //    function (err, result) {
//     //        if (err) console.log(err);
//     //    }
//     //);
//     connection.query('SELECT * FROM  `cell_status_in`',
//         function (err, result) {
//             if (err) throw err;
//             res.send(JSON.stringify(result));
//         });
// });

// app.post('/get_fork_truck_queue', function (req, res) {
//     //console.log( JSON.stringify( req.body ) );
//     connection.query("SELECT `order_queue`.`id`, `part`.`number`, `part`.`desc` FROM `smartplant`.`order_queue` LEFT JOIN `part` ON `part`.`id`=`order_queue`.`part_id` ",
//         function (err, result) {
//             try {
//                 if (err) throw err;
//                 console.log(JSON.stringify( result ));
//                 res.send(JSON.stringify( result ));
//             } catch (err) {
//                 res.send(JSON.stringify(err));
//             }
//         }
//     );
// });

// app.post('/get_changeover_log', function (req, res) {
//     var sql = "SELECT t1.`duration`, t1.`comments`, t1.`vac_temp`, t1.`mts_number`, date_format(t1.`start_time`,'%m/%d/%Y %H:%i') AS 'start_time', t2.`name` AS 'cell_id', t3.`number` AS 'from_part_number', t4.`number` AS 'to_part_number', t5.`name` AS 'user_id' FROM `maint_changeover` AS t1 INNER JOIN `cell` AS t2 ON t2.`id` = t1.`cell_id` INNER JOIN `part` AS t3 ON t3.`id` = t1.`from_part_number` INNER JOIN `part` AS t4 ON t4.`id` = t1.`to_part_number` INNER JOIN `user` AS t5 ON t5.`id` = t1.`user_id` WHERE `start_time` >= STR_TO_DATE({startdate},'%m/%d/%Y') AND `start_time` < (STR_TO_DATE({stopdate},'%m/%d/%Y') + INTERVAL 1 DAY) ".formatSQL(req.body);
//     console.log( sql );
//     connection.query(sql,

//         function (err, result) {
//             if (err) throw err;
//             console.log( JSON.stringify(result) );
//             res.send(JSON.stringify(result));
//         }
//     );
// });

// app.post('/get_downtime_log', function (req, res) {
//     var sql = "SELECT t1.`duration`, t1.`comment`, t1.`follow_up`, date_format(t1.`start_time`,'%m/%d/%Y %H:%i') AS 'start_time', t2.`name` AS 'cell_id', t3.`name` AS 'code_name', t4.`name` AS 'user_id' FROM `maint_downtime_log` AS t1 INNER JOIN `cell` AS t2 ON t2.`id` = t1.`cell_id` INNER JOIN `maint_downtime_codes` AS t3 ON t3.`id` = t1.`code_id` INNER JOIN `user` AS t4 ON t4.`id` = t1.`user_id` WHERE `start_time` >= STR_TO_DATE({startdate},'%m/%d/%Y') AND `start_time` < (STR_TO_DATE({stopdate},'%m/%d/%Y') + INTERVAL 1 DAY) ".formatSQL(req.body);
//     console.log( sql );
//     connection.query(sql,

//         function (err, result) {
//             if (err) throw err;
//             console.log( JSON.stringify(result) );
//             res.send(JSON.stringify(result));
//         }
//     );
// });

// app.post('/get_cell_id', function (req, res) {
//     var sql = "SELECT * FROM `cell`".formatSQL(req.body);
//     console.log( sql );
//     connection.query(sql,

//         function (err, result) {
//             if (err) throw err;
//             res.send(JSON.stringify(result));
//         }
//     );
// });

// app.post('/get_user_id', function (req, res) {
//     var sql = "SELECT t1.user_id, t2.`name` AS 'name' FROM `user_run_status` as t1 INNER JOIN `user` AS t2 ON t2.`id` = t1.`user_id` WHERE `privilege_id` = 8".formatSQL(req.body);
//     console.log( sql );
//     connection.query(sql,

//         function (err, result) {
//             if (err) throw err;
//             res.send(JSON.stringify(result));
//         }
//     );
// });

// app.post('/get_maint_id', function (req, res) {
//     var sql = "SELECT t1.user_id, t2.`name` AS 'name' FROM `user_run_status` as t1 INNER JOIN `user` AS t2 ON t2.`id` = t1.`user_id` WHERE `privilege_id` = 8".formatSQL(req.body);
//     console.log( sql );
//     connection.query(sql,

//         function (err, result) {
//             if (err) throw err;
//             res.send(JSON.stringify(result));
//         }
//     );
// });

// app.post('/get_downtime_code', function (req, res) {
//     var sql = "SELECT * FROM `maint_downtime_codes`".formatSQL(req.body);
//     console.log( sql );
//     connection.query(sql,

//         function (err, result) {
//             if (err) throw err;
//             res.send(JSON.stringify(result));
//         }
//     );
// });

// app.post('/get_part_quant', function (req, res) {
//     var sql = "SELECT DISTINCT t2.`parts_per_container`, t1.parent_id, t2.`number` AS 'name' FROM `part_relation` as t1 INNER JOIN `part` AS t2 ON t2.`id` = t1.`parent_id` WHERE t1.parent_id = {parent_id}".formatSQL(req.body);
//     console.log( sql );
//     connection.query(sql,

//         function (err, result) {
//             if (err) throw err;
//             res.send(JSON.stringify(result));
//         }
//     );
// });

// app.post('/submit_changeover', function (req, res) {
//     var sql = "INSERT INTO `smartplant`.`maint_changeover` (`id`, `cell_id`, `from_part_number`, `to_part_number`, `start_time`, `duration`, `user_id`, `comments`, `vac_temp`, `mts_number`) VALUES (NULL, {cell_id}, {part_from_id}, {part_to_id}, STR_TO_DATE({datetime_val},'%m/%d/%Y %H:%i'), {duration}, {user_id}, {comment}, {vac_temp}, {mts_number});".formatSQL(req.body);
//     console.log( sql );
//     connection.query(sql,

//         function (err, result) {
//             if (err) throw err;
//             res.send(JSON.stringify(result));
//         }
//     );
// });

// app.post('/submit_downtime', function (req, res) {
//     var sql = "INSERT INTO `smartplant`.`maint_downtime_log` (`id`, `cell_id`, `start_time`, `duration`, `user_id`, `comment`, `code_id`, `follow_up`) VALUES (NULL, {cell_id}, STR_TO_DATE({datetime_val},'%m/%d/%Y %H:%i'), {duration}, {user_id}, {comment}, {code_id}, {follow_up});".formatSQL(req.body);
//     console.log( sql );
//     connection.query(sql,

//         function (err, result) {
//             if (err) throw err;
//             res.send(JSON.stringify(result));
//         }
//     );
// });

// app.post('/bom_part', function (req, res) {
//     /* Function for the handling of url: /bom_part
//      *
//      * Args:
//      *    req (Request): from expressjs api http://expressjs.com/api#req.params
//      *    res (Response): from expressjs api http://expressjs.com/api#res.status
//      *
//      * in normal languages looping would have been done once but because we are calling
//      * out to a SQL query with it's callback and response the program cannot block therefore
//      * I cannot keep variables scoped within the context of the callback so to get around this
//      * I create a context that the callbacks can all scope and use a python trick of reference
//      * counting to know when all code path's have returned thus calling the finish function
//      * to send a reply back to the client. this has the surprising upshot of speed as the
//      * non-blocking code can query the DB in parallel and update variables only when the reply
//      * happens. therefore instead of calling all the Select queries one by one it calls them in
//      * groups thus making the code operate faster.
//      *
//      * One thing to fix is if the tables create a circular reference we can just check the context
//      * to see if it already exists and quit processing that branch. hint hint wink wink...
//      */
//      try {
//         /* need reference counting to know when all paths are complete
//          * so we add 1 to the reference on call, and when the function query completes we decrement the ref
//          * this is done with a local context relevant to the app.post function callback.
//          */
//         var ctx = {'ref':0,};

//         var finish = function(){
//             /* function used when all code paths complete (called once)
//              */
//             var compile = function( id , indent){
//                 /* recursive function to build up the data
//                  */
//                 var ret = '';
//                 for (var each in ctx[id]) { // loop through all the keys in context where context is id
//                     ret += indent + ctx[id][each].number + ' ' + ctx[id][each].desc + '<br>';
//                     ret += compile(ctx[id][each].id, indent + '&nbsp;&nbsp;&nbsp;&nbsp;');
//                 };
//                 return ret;
//             };

//             //res.send(ctx['root'].number + ' ' + ctx['root'].desc + '<br>' + compile(ctx['root'].id, '&nbsp;&nbsp;&nbsp;&nbsp;'));

//             res.send( JSON.stringify( ctx ) );
//         }



//         var recurse_table = function( id ) {
//             /* From base Part number recursively lookup all the children to find the full hierarchy.
//              *
//              */
//             ctx['ref']+=1; // step 1 increment reference count
//             var self = {}  // create object to fill in later query step
//             ctx[id]=self;  // place object in context and fill it later in callbacks
//             connection.query("SELECT * FROM `smartplant`.`part_relation` AS t1 RIGHT JOIN `smartplant`.`part` AS t2 ON `t2`.`id`=`t1`.`child_id` WHERE `t1`.`parent_id`=?", [id],
//                 function (err, result) {
//                     /* Query relationship table with a Right JOIN to bring all the data from table into view for extraction
//                      *
//                      */
//                     if (err) throw err;
//                     for (var i=0; i<result.length; i++){
//                         console.log( JSON.stringify(result[i].child_id) );
//                         // loop through data and launch this same query against all nodes to dig a level deeper
//                         //recurse_table( result[i].child_id );
//                         self[result[i].child_id] = result[i]; // update self object with found result.
//                     }
//                     ctx['ref']-=1; // function is all done then decrement our reference count in context


//                     if (ctx['ref'] == 0) // if reference count is finally zero (no further query's out there) then end it with the finish call.
//                         finish();
//                 })
//         }



//         // Really Start Here for this function
//         connection.query("SELECT * FROM  `smartplant`.`part` WHERE `number`=? ", [req.body.part_number],
//             function (err, result) {
//                 /* First callback on select statement to find part number
//                  *
//                  */
//                 if (err) throw err;
//                 ctx['root'] = result[0];
//                 console.log(JSON.stringify(ctx));
//                 recurse_table(result[0].id);
//             }
//         );

//     } catch (err) {
//         /* something broke
//          *
//          */
//         res.send(JSON.stringify(err));
//     }
// });

// app.post('/training_matrix', function (req, res) {
//     /* Function for the handling of url: /training_matrix
//      *
//      * Args:
//      *    req (Request): from expressjs api http://expressjs.com/api#req.params
//      *    res (Response): from expressjs api http://expressjs.com/api#res.status
//      */
//      try {
//         /* need reference counting to know when all paths are complete
//          * so we add 1 to the reference on call, and when the function query completes we decrement the ref
//          * this is done with a local context relevant to the app.post function callback.
//          */
//         var ctx = {'ref':0,};

//         var finish = function(){
//             var ids = [];
//             for (i=0; i<ctx['cell_instruction'].length; i++){
//                 ids.push("`training_instruction_id`='" + ctx['cell_instruction'][i].id + "'");
//             }
//             for (i=0; i<ctx['part_instruction'].length; i++){
//                 ids.push("`training_instruction_id`='" + ctx['part_instruction'][i].id + "'");
//             }
//             var sql = "SELECT * FROM  `cells`.`training_signoff` WHERE `user_id` = (SELECT id FROM `cells`.`user` WHERE `name`=" + connection.escape(req.body.user_name) + ")";
//             if (ids.length > 0){
//                 sql += " AND ( " + ids.join(' OR ') + " )";
//             }
//             console.log( JSON.stringify(ctx) );
//             connection.query(sql,
//                 function (err, result) {
//                     /* now find all signoff items.
//                      *
//                      */
//                     if (err) throw err;
//                     ctx['training_signoff'] = result;

//                     var color = '';
//                     var reply = '<table><tr><td>' + req.body.user_name + '</td>';
//                     for (i=0; i<ctx['cell_instruction'].length; i++){
//                         color = '#FFFFFF'
//                         for (j=0; j<ctx['training_signoff'].length; j++){
//                             if (ctx['cell_instruction'][i].id == ctx['training_signoff'][j].training_instruction_id)
//                                 color = '#005500' ;
//                         }
//                         reply += '<td bgColor=' + color +'>' + ctx['cell_instruction'][i].desc + '</td>';
//                     }
//                     for (i=0; i<ctx['part_instruction'].length; i++){
//                         color = '#FFFFFF'
//                         for (j=0; j<ctx['training_signoff'].length; j++){
//                             if (ctx['part_instruction'][i].id == ctx['training_signoff'][j].training_instruction_id)
//                                 color = '#005500' ;
//                         }
//                         reply += '<td bgColor=' + color +'>' + ctx['part_instruction'][i].desc + '</td>';
//                     }
//                     reply += '</tr></table>';
//                     res.send(reply);
//                 }
//             );
//         }

//         ctx['ref']+=1; // step 1 increment reference count

//         // Really Start Here for this function
//         connection.query("SELECT * FROM  `cells`.`training_instruction` WHERE `cell_id`=(SELECT `Cell_ID` FROM `cells`.`cell` WHERE `Cell_Schemata`=?) OR `part_id`=(SELECT `Part_id` FROM `cells`.`parts` WHERE `Part_Num`=?)", [req.body.cell_name, req.body.part_name],
//             function (err, result) {
//                 /* First callback on select statement to find part number
//                  *
//                  */
//                 if (err) throw err;
//                 ctx['part_instruction'] = result;
//                 ctx['ref']-=1; // function is all done then decrement our reference count in context
//                 if (ctx['ref'] == 0) // if reference count is finally zero (no further query's out there) then end it with the finish call.
//                     finish();
//             }
//         );
//     } catch (err) {
//         /* something broke
//          *
//          */
//         res.send(JSON.stringify(err));
//     }
// });

// app.post('/set_logoff', function (req, res) {
//     connection.query("INSERT INTO `",
//         function (err, result) {
//             if (err) throw err;
//             console.log('/get_user result=' + JSON.stringify(result));
//             res.send(JSON.stringify(result));
//         }
//     );
// });

// app.post('/set_login', function (req, res) {
//     connection.query("INSERT INTO `",
//         function (err, result) {
//             if (err) throw err;
//             console.log('/get_user result=' + JSON.stringify(result));
//             res.send(JSON.stringify(result));
//         }
//     );
// });

// app.post('/get_login', function (req, res) {
//     connection.query("SELECT t2.`name`, t3.`name` AS 'cell_name' FROM `smartplant`.`cell_status_in` as t1  INNER JOIN  `smartplant`.`user` as t2 ON  t1.`value` = t2.`badge` LEFT JOIN `smartplant`.`cell` AS t3 ON t1.`cell_id`=t3.`id` WHERE t1.`label`='badge'",
//         function (err, result) {
//             if (err) throw err;
//             console.log('/get_user result=' + JSON.stringify(result));
//             res.send(JSON.stringify(result));
//         }
//     );
// });

// app.post('/cell_status_out', function (req, res) {
//     connection.query("INSERT INTO `smartplant`.`cell_status_out` (`item_id`, `value`) VALUES ( ?, ? ) ON DUPLICATE KEY UPDATE `value`= ? ;", [req.body.id, req.body.value, req.body.value],
//         function (err, result) {
//             if (err) throw err;
//             res.send('JSON Response:<br>' + JSON.stringify(result));
//         }
//     );
// });

// app.post('/get_user_stations', function (req, res) {
//     connection.query("SELECT * FROM `smartplant`.`user_station`",
//         function (err, result) {
//             if (err) throw err;
//             res.send(JSON.stringify(result));
//         }
//     );
// });

// app.post('/check_user_stations', function (req, res) {
//     connection.query("SELECT COUNT(user_id) AS count FROM `smartplant`.`user_station` WHERE user_id=?", [req.body.id],
//         function (err, result) {
//             if (err) throw err;
//             res.send(JSON.stringify(result));
//         }
//     );
// });

// app.post('/remove_user_from_station', function (req, res) {
//     connection.query("UPDATE `smartplant`.`user_station` SET user_id=NULL WHERE user_id=?", [req.body.id],
//         function (err, result) {
//             if (err) throw err;
//             res.send(JSON.stringify(result));
//         }
//     );
// });

// app.post('/add_user_to_station', function (req, res) {
//     connection.query("UPDATE `smartplant`.`user_station` SET user_id=? WHERE location=?", [req.body.id, req.body.location],
//         function (err, result) {
//             if (err) throw err;
//             res.send(JSON.stringify(result));
//         }
//     );
// });

/* =======================================================================
    HUTCHINSON[4] - APPLICATION
========================================================================== */
/* GET home page. */
// router.get('/', function(req, res) {
//     console.log('router.get %s %s %s', req.method, req.url, req.path);
//     res.render('index', { title: 'Express' });
// });