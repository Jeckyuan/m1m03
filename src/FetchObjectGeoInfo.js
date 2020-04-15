var turf = require("@turf/helpers");

var WKT = require("terraformer-wkt-parser");

export function stringToGeoJSON(wktStr) {
  const geomtry1 = WKT.parse(
    "MULTIPOLYGON (((116.3924546 39.9830351, 116.3921525 39.982865, 116.3919287 39.9826344, 116.3918031 39.9823637, 116.3917867 39.9820767, 116.3918809 39.9817986, 116.3920774 39.9815539, 116.392359 39.9813642, 116.3927009 39.9812461, 116.3930729 39.9812101, 116.3934423 39.9812592, 116.3937794 39.9813909, 116.3940506 39.981593, 116.3942315 39.9818476, 116.394306 39.9821319, 116.3942673 39.9824203, 116.394119 39.982687, 116.3938743 39.9829081, 116.3935551 39.9830638, 116.3931901 39.9831401, 116.392812 39.9831303, 116.3924546 39.9830351)))"
  );

  var geomtry = {
    type: "MultiPolygon",
    coordinates: [
      [
        [
          [116.392455, 39.983035],
          [116.392152, 39.982865],
          [116.391929, 39.982634],
          [116.391803, 39.982364],
          [116.391787, 39.982077],
          [116.391881, 39.981799],
          [116.392077, 39.981554],
          [116.392359, 39.981364],
          [116.392701, 39.981246],
          [116.393073, 39.98121],
          [116.393442, 39.981259],
          [116.393779, 39.981391],
          [116.394051, 39.981593],
          [116.394232, 39.981848],
          [116.394306, 39.982132],
          [116.394267, 39.98242],
          [116.394119, 39.982687],
          [116.393874, 39.982908],
          [116.393555, 39.983064],
          [116.39319, 39.98314],
          [116.392812, 39.98313],
          [116.392455, 39.983035],
        ],
      ],
    ],
  };

  var locationA = turf.point([116.58215830000000324, 40.07932220000000001], {
    name: "1号航站楼",
  });
  var locationB = turf.point([116.58750410000000386, 40.07808140000000208], {
    name: "2号航站楼",
  });
  var locationC = turf.point([116.60985119999999426, 40.05174250000000313], {
    name: "3号航站楼",
  });
  var locationD = turf.point([116.54971709999999518, 40.06772370000000194], {
    name: "地铁国展站",
  });

  var collection = turf.featureCollection([
    locationA,
    locationB,
    locationC,
    locationD,
  ]);

  return collection;
}

export function resultDataTranslater(res) {
  var intemList = [];

  var its = res.data.instances;

  for (var i in its) {
    console.log(its[i]);
    console.log('----')
    var ds = its[i].instance_data.CIM_BUILDIN_BASE_DATASET_NAME;
    var geoinfo = ds.CIM_GeographicInformation;
    console.log(geoinfo);
    const geomtry1 = WKT.parse(geoinfo);
    ds.coord = geomtry1.coordinates;

    intemList.push(ds);
  }

  return intemList;
}


export function resultDataTranslaterName(res) {
  var intemList = [];

  var its = res.data.instances;

  for (var i in its) {
    console.log(its[i]);
    var ds = its[i].instance_data.china_points_0401DataSet;
    var geoinfo = ds.CIM_GeographicInformation;
    const geomtry1 = WKT.parse(geoinfo);
    ds.coord = geomtry1.coordinates;
    intemList.push(ds);
  }

  return intemList;
}
