import { Scene, PointLayer, Popup } from "@antv/l7";
import { GaodeMap } from "@antv/l7-maps";
import {
  resultDataTranslaterName,
  resultDataTranslater,
} from "./FetchObjectGeoInfo";

const queryInstanceUrl =
  "http://localhost:7109/objectTypes/china_points_0401/instances/query";
const queryParameters = {
  page_index: 0,
  page_size: 500,
};
const scene = new Scene({
  id: "map",
  map: new GaodeMap({
    style: "light",
    center: [116.5821583, 40.0793222],
    pitch: 0,
    zoom: 12,
  }),
});

scene.on("loaded", () => {
  fetch(queryInstanceUrl, {
    body: JSON.stringify(queryParameters), // must match 'Content-Type' header
    headers: {
      "user-agent": "Mozilla/4.0 MDN Example",
      "content-type": "application/json",
      "PCOP-TENANTID": "1",
      "PCOP-USERID": "1",
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
  })
    .then((res) => res.json())
    .then((data) => {
      const pointLayer = new PointLayer({})
        .source(resultDataTranslater(data), {
          parser: {
            type: "json",
            coordinates: "coord",
          },
        })
        .shape("circle")
        .size(4)
        .active(true)
        .color("red")
        .style({
          opacity: 0.5,
          strokeWidth: 0,
        });

      pointLayer.on("click", (e) => {
        const popup = new Popup({
          offsets: [0, 0],
          closeButton: false,
        })
          .setLnglat(e.lngLat)
          .setHTML(`<span>osm_id: ${e.feature.ID}</span>`);
        scene.addPopup(popup);
      });

      scene.addLayer(pointLayer);

      const textPointLayer = new PointLayer({})
        .source(resultDataTranslaterName(data), {
          parser: {
            type: "json",
            coordinates: "coord",
          },
        })
        .shape("osm_id", "text")
        .size(12)
        .color("blue")
        .style({
          textAnchor: "center", // 文本相对锚点的位置 center|left|right|top|bottom|top-left
          textOffset: [0, 0], // 文本相对锚点的偏移量 [水平, 垂直]
          spacing: 2, // 字符间距
          padding: [1, 1], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
          stroke: "#ffffff", // 描边颜色
          strokeWidth: 0.3, // 描边宽度
          strokeOpacity: 1.0,
        });

      scene.addLayer(textPointLayer);
    });
});

//   const data = {
//     type: "FeatureCollection",
//     features: [
//       {
//         type: "Feature",
//         properties: {
//           name: "1号航站楼",
//         },
//         geometry: {
//           type: "Point",
//           coordinates: [116.5821583, 40.0793222],
//         },
//       },
//       {
//         type: "Feature",
//         properties: {
//           name: "2号航站楼",
//         },
//         geometry: {
//           type: "Point",
//           coordinates: [116.5875041, 40.0780814],
//         },
//       },
//       {
//         type: "Feature",
//         properties: {
//           name: "3号航站楼",
//         },
//         geometry: {
//           type: "Point",
//           coordinates: [116.6098512, 40.0517425],
//         },
//       },
//     ],
//   };

//   const pointsData = stringToGeoJSON(null);

//   const pointLayer = new PointLayer({})
//     .source(resultDataTranslater(md), {
//       parser: {
//         type: "json",
//         coordinates: "coord",
//       },
//     })
//     .shape("circle")
//     .size(4)
//     .active(true)
//     .color("red")
//     .style({
//       opacity: 0.5,
//       strokeWidth: 0,
//     });

//   scene.addLayer(pointLayer);
// });

// const md = {
//   code: "E05000200",
//   message: "Success",
//   data: {
//     total_count: 106906,
//     instances: [
//       {
//         instance_rid: "#12740:0",
//         instance_data: {
//           CIM_BUILDIN_BASE_DATASET_NAME: {
//             ID:
//               "china_points_0401_30b891ea-d394-465b-a6a9-f1d3b79d979e_1586856374205",
//           },
//           china_points_0401DataSet: {
//             osm_id: "24329663",
//             CIM_GeographicInformation: "POINT (113.5350205 22.1851929)",
//             name: "",
//             type: "crossing",
//             the_geom: "POINT (113.5350205 22.1851929)",
//             timestamp: "2014-08-14T12:11:27Z",
//           },
//         },
//       },
//       {
//         instance_rid: "#12740:1",
//         instance_data: {
//           CIM_BUILDIN_BASE_DATASET_NAME: {
//             ID:
//               "china_points_0401_ede0cc8f-eac8-4422-b1f5-29cb377cacd1_1586856374278",
//           },
//           china_points_0401DataSet: {
//             osm_id: "25248790",
//             CIM_GeographicInformation: "POINT (116.3898158 39.8987502)",
//             name: "",
//             type: "traffic_signals",
//             the_geom: "POINT (116.3898158 39.8987502)",
//             timestamp: "2011-08-27T02:57:11Z",
//           },
//         },
//       },
//       {
//         instance_rid: "#12740:2",
//         instance_data: {
//           CIM_BUILDIN_BASE_DATASET_NAME: {
//             ID:
//               "china_points_0401_10ca0273-6a78-4a0d-869d-dc6416ff421f_1586856374312",
//           },
//           china_points_0401DataSet: {
//             osm_id: "25954993",
//             CIM_GeographicInformation: "POINT (120.137141 30.2681689)",
//             name: "",
//             type: "traffic_signals",
//             the_geom: "POINT (120.137141 30.2681689)",
//             timestamp: "2009-01-08T11:57:44Z",
//           },
//         },
//       },
//     ],
//   },
// };

// console.log(resultDataTranslater(md));
