/**
 * Created with JetBrains WebStorm.
 * Author: rye
 * Date: 10/10/13
 * Time: 2:29 PM
 */

$(document).ready(function() {

    var ac = new AttendenceController();
//    var table = $('#attendence-table');

    var table_div = $('#attendence-div');
    var table = $('<table class=\'table table-striped table-bordered table-responsive table-hover table-condensed\'></table>');
    $('#save-btn').hide();
    $('#send-email-btn').hide();

    var drop_handler = new Dropzone('div#drop', {url:'upload-file'});

    drop_handler.on('sending', function(file, xhr, formData) {
        var holidays = $('#holidays').multiDatesPicker('getDates');
        formData.append('holidays', holidays);
    });

    drop_handler.on('addedfile', function(file) {

        // Just clean the table and dropzone view
        table_div.remove();
        table_div = $('<div id="attendence-div" class=\'table-responsive tab-content\'></div>');
        $('#table-panel-div').append(table_div);

        table.remove();
        table = $('<table class=\'table table-striped table-bordered table-responsive table-hover table-condensed\'></table>');

        $('#att-tab').remove();
        $('#save-btn').show();
        $('#send-email-btn').show();
    });

    drop_handler.on('success', function(file, response) {
//        console.log('response code ' + response);
        var json_data = response;
        var titles = json_data.titles;
        var records = json_data.records;
        var tabs = $('<ul class="nav nav-tabs nav-justified" id="att-tab"></ul>');

        $('#sheet-tab').append(tabs);

        // Build workbook
        $.each(records, function(sheet_name, sheet) {
            var sheet_header_text = '小组名称：物联网支撑+无线自组织传感网';
            var header_row = $('<tr></tr>').append($('<td></td>').append($('<input>', {value : sheet_header_text})));
            var foot_rows = [
                $('<tr></tr>'),
                $('<tr></tr>').append($('<td></td>').append($('<input>', {value : '加班次数从上月16日到本月15日'}))),
                $('<tr></tr>').append($('<td></td>').append($('<input>', {value : '绩效计算公式：总加班*15元餐补+强制晚加班*40元补贴+（强制周末加班时间/8小时）*100+（一般晚加班*40+（一般周末加班时间/8小时）*100）*效果评价+出差*100-事假*80-迟到*40'}))),
                $('<tr></tr>').append($('<td></td>').append($('<input>', {value : '说明：'}))),
                $('<tr></tr>').append($('<td></td>').append($('<input>', {value : ' i.              加班效果评价按照百分比计算=加班百分比*加班效果，假设加班百分比为20%，加班效果是30%，那么加班效果评价就是6%'}))),
                $('<tr></tr>').append($('<td></td>').append($('<input>', {value : ' ii.              加班百分比是指人在加班时间里有多少时间是用于工作，多少时间用于学习和娱乐。这个参数不好衡量，所以现在基本上通过组长来给一个综合评价效果。'}))),
                $('<tr></tr>').append($('<td></td>').append($('<input>', {value : ' iii.              通常事假是指由于个人因素的请假，到北大办理各种手续通常不计算在内。'}))),
                $('<tr></tr>').append($('<td></td>').append($('<input>', {value : ' iv.              出差是指北京以外的因公外出，时间的回来日期-出发日期（头尾算一天）。如果当天来回算1天。'}))),
                $('<tr></tr>').append($('<td></td>').append($('<input>', {value : ' v.              孙老师新增加的一条规定是：去新疆出差，每天的补助增加100元，也就是在公式中“*200”。'})))
            ];

            var curr_table = $('<table class=\'table table-striped table-bordered table-responsive table-hover table-condensed\'></table>');
            var content_div = $('<div class="tab-pane fade"></div>')

            // Build title line
            var title_row = $('<tr></tr>');
            $.each(titles, function(key, title) {
                $('<td></td>').append($('<input>', {value : title})).appendTo(title_row);
            });
            curr_table.append(title_row);

            curr_table.attr('id', sheet_name);
            content_div.attr('id', sheet_name);

            curr_table.append(header_row);
            curr_table.append($('<tr></tr>'));
            curr_table.append(title_row);


            // Build sheet tabs
            var tab = $('<li></li>');
            var row = $('<tr></tr>');

            tab.append($('<a href="#' + sheet_name + '" data-toggle="tab">' + sheet_name + '</a>'));
            tabs.append(tab);


            // Build sheet table
            $.each(sheet, function(name, record) {
                row = $('<tr></tr>');
                // Build sheet rows
                $.each(record, function(id, cell) {
                    $('<td></td>').append($('<input>', {value : cell})).appendTo(row);
                });
                row.appendTo(curr_table);
            });

            // Build footer line
            $.each(foot_rows, function(id, foot) {
                curr_table.append(foot);
            })

            // Build sheet tab content
            curr_table.appendTo(content_div);
            content_div.appendTo(table_div);
            $('#' + sheet_name + ' a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            })
        });
//        console.log(table);
    });
})