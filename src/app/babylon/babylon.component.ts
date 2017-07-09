import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as BABYLON from 'babylonjs';

@Component({
  selector: 'spt-babylon',
  styleUrls: [ './babylon.component.scss' ],
  templateUrl: './babylon.component.html',
})
export class BabylonComponent implements AfterViewInit {

  @ViewChild('canvas') private canvas: ElementRef;

  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;
  private camera: BABYLON.FreeCamera;
  private light: BABYLON.Light;

  public ngAfterViewInit(): void {
    this.engine = new BABYLON.Engine(this.canvas.nativeElement, true);

    this.createScene();
    this.animate();
  }

  public createScene(): void {
    this.scene = new BABYLON.Scene(this.engine);
    this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this.scene);

    this.camera.setTarget(BABYLON.Vector3.Zero());
    this.camera.attachControl(this.canvas.nativeElement, false);

    this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);

    const sphere = BABYLON.MeshBuilder.CreateSphere(
      'sphere1',
      {
        diameter: 2,
        segments: 16,
      },
      this.scene,
    );
    sphere.position.y = 1;

    BABYLON.MeshBuilder.CreateGround(
      'ground1',
      {
        height: 6,
        subdivisions: 2,
        width: 6,
      },
      this.scene,
    );
  }

  private animate(): void {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }
}
