var colorfunc = function (value) {
  if (value < 30) {
    return "green";
  } else if (value < 50) {
    return "blue";
  } else if (value < 70) {
    return "#FFCC00";
  } else {
    return "red";
  }
};
var medalicon = function (value, data, type, params, component) {
  //value - original value of the cell
  //data - the data for the row
  //type - the type of mutation occurring  (data|edit)
  //params - the mutatorParams object from the column definition m
  //component - when the "type" argument is "edit", this contains the cell component for the edited cell, otherwise it is the column component for the column
  var color;
  switch (component._column.field) {
    case "Medals.Bronze":
      color = "#cd7f32";
      break;
    case "Medals.Silver":
      color = "#C0C0C0";
      break;
    case "Medals.Gold":
      color = "#FFD700";
      break;
    default:
      color = "#e5e4e2";
      break;
    // code block
  }
  return (
    '<span style="color:' +
    color +
    '"<i class="fas fa-medal"></i></span> ' +
    value
  );

  //return the new value for the cell data.
};

var lineFormatter = function (cell, formatterParams, onRendered) {
  onRendered(function () {
    //instantiate sparkline after the cell element has been aded to the DOM

    var val_arr = [500];
    var curr_val = cell.getValue();
    for (var key in curr_val) {
      val_arr.push(curr_val[key]); // val1 and etc...
    }

    $(cell.getElement()).sparkline(val_arr, {
      width: "100%",
      type: "line",

      spotRadius: 4,
      spotColor: false,
      minSpotColor: false,
      maxSpotColor: false,
      disableTooltips: false,
      valueSpots: $.range_map({
        ":300": "green",
        "300:500": "blue",
        "501:700": "#FFCC00",
        "701:": "red"
      })
    });
  });
};
function getHyperLink(cellComp, formatterParams, onRendered) {
  var cellData = cellComp.getData();
  var cellValue = cellComp.getValue();

  var hrefString = "https://hackerrank.com/" + cellData.Username;
  var new_uname =
    "<a href='" +
    hrefString +
    "' target='_blank' " +
    "style='color: " +
    colorfunc(cellData.Rating / 10) +
    " !important; font-weight:bold;'" +
    "><strong>" +
    cellValue +
    "</strong></a>";

  return new_uname;
}

var table = new Tabulator("#leaderboard", {
  ajaxURL: "https://zarar.win/inzva/data.json", //ajax URL
  //layout: "fitColumns", //fit columns to width of table (optional)
  layout: "fitColumns",
  //responsiveLayout: "collapse",
  //responsiveLayout: "collapse",
  columns: [
    {
      title: "#",
      field: "rank",
      resizable: false,
      width: 60
    },
    {
      title: "Username",
      field: "Username",
      formatter: getHyperLink,
      width: 180,
      resizable: false,
      headerSort: false
    },
    {
      title: "Fullname",
      field: "FullName",
      width: 150,
      resizable: false,
      formatter: "textarea",
      headerSort: false
    },
    {
      title: "Total Problems Solved",
      width: 100,
      field: "Total Problem Solved",
      resizable: false,
      headerSort: false
    },
    { title: "Rating", field: "Rating", width: 99, resizable: false },
    /*{
      title: "Progress",
      field: "Rating",
      formatter: progressx,
      formatterParams: { color: colorfunc },
      sorter: "number",
      minWidth: 150
    },*/

    {
      title: "Rating History",
      field: "Rating History",
      width: 160,
      formatter: lineFormatter,
      resizable: false,
      headerSort: false,
      responsive: false
    },

    {
      //create column group
      title: "MEDALS",
      width: 384,
      columns: [
        {
          title: "Bronze",
          field: "Medals.Bronze",
          width: 99,
          mutator: medalicon,
          formatter: "html",
          resizable: false
        },
        {
          title: "Silver",
          field: "Medals.Silver",
          width: 90,
          mutator: medalicon,
          formatter: "html",
          resizable: false
        },
        {
          title: "Gold",
          mutator: medalicon,
          field: "Medals.Gold",
          width: 90,
          formatter: "html"
        },
        {
          title: "Platinum",
          mutator: medalicon,
          field: "Medals.Platinum",
          width: 105,
          formatter: "html",
          resizable: false
        }
      ]
    }
  ]
});

table.setSort([
  { column: "Rating", dir: "desc" } //sort by this first
]);
