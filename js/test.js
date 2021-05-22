
var canvas = document.getElementById("render-canvas");
var engine = new BABYLON.Engine(canvas);
var scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.9, 0.9, 0.9);
var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -2), scene);
var light = new BABYLON.PointLight("light", new BABYLON.Vector3(10, 10, -10), scene);
const plane = BABYLON.MeshBuilder.CreatePlane("plane" ,scene)
var sphere = BABYLON.Mesh.CreateSphere("speher",32, 0.1, scene);
sphere.rotation.x = -0.2;
sphere.rotation.y = -0.4;
sphere.position._z=-0.5;
var boxMaterial = new BABYLON.StandardMaterial("material", scene);
plane.material = new BABYLON.StandardMaterial("material", scene);
plane.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
boxMaterial.emissiveColor = new BABYLON.Color3(1, 0.58, 0.86);
sphere.material = boxMaterial;
var renderLoop = function () {
    scene.render();
};
engine.runRenderLoop(renderLoop);


new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
      datasets: [{ 
          data: [86,114,106,106,107,111,133,221,783,2478],
          label: "Africa",
          borderColor: "#3e95cd",
          fill: false
        }, { 
          data: [282,350,411,502,635,809,947,1402,3700,5267],
          label: "Asia",
          borderColor: "#8e5ea2",
          fill: false
        }, { 
          data: [168,170,178,190,203,276,408,547,675,734],
          label: "Europe",
          borderColor: "#3cba9f",
          fill: false
        }, { 
          data: [40,20,10,16,24,38,74,167,508,784],
          label: "Latin America",
          borderColor: "#e8c3b9",
          fill: false
        }, { 
          data: [6,3,2,2,7,26,82,172,312,433],
          label: "North America",
          borderColor: "#c45850",
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'World population per region (in millions)'
      }
    }
  });