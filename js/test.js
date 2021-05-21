import * as BABYLON from 'babylonjs'
var canvas = document.getElementById("render-canvas");
var engine = new BABYLON.Engine(canvas);
var scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);
var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -10), scene);
var light = new BABYLON.PointLight("light", new BABYLON.Vector3(10, 10, 0), scene);

var box = BABYLON.Mesh.CreateBox("box", 2, scene);
box.rotation.x = -0.2;
box.rotation.y = -0.4;

var boxMaterial = new BABYLON.StandardMaterial("material", scene);
boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
box.material = boxMaterial;

var renderLoop = function () {
    scene.render();
};
engine.runRenderLoop(renderLoop);
