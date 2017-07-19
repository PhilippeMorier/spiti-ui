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
  private selectionBox: BABYLON.Mesh;

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

    const box = BABYLON.MeshBuilder.CreateBox('box', {}, this.scene);
    box.position.x = 0;
    this.selectionBox = BABYLON.MeshBuilder.CreateBox('selectionBox', {}, this.scene);
    this.selectionBox.isVisible = false;
  }

  private animate(): void {
    this.engine.runRenderLoop(() => {
      this.showSelectionBox();
      this.scene.render();
    });

    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }

  private showSelectionBox(): void {
    const pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY);

    if (!pickResult.hit) {
      this.selectionBox.isVisible = false;
      return;
    }

    if (pickResult.pickedMesh.name === 'selectionBox') {
      return;
    }

    this.selectionBox.position = pickResult
      .pickedMesh
      .position
      .add(this.getPositionOffset(pickResult.faceId));
    this.selectionBox.isVisible = true;
  }

  private getPositionOffset(faceId: number): BABYLON.Vector3 {
    switch (faceId) {
      case 0:
      case 1:
        return new BABYLON.Vector3(0, 0, 1);
      case 2:
      case 3:
        return new BABYLON.Vector3(0, 0, -1);
      case 4:
      case 5:
        return new BABYLON.Vector3(1, 0, 0);
      case 6:
      case 7:
        return new BABYLON.Vector3(-1, 0, 0);
      case 8:
      case 9:
        return new BABYLON.Vector3(0, 1, 0);
      case 10:
      case 11:
        return new BABYLON.Vector3(0, -1, 0);
      default:
        throw new Error('Face id not supported');
    }
  }
}
