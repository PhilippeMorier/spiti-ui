import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import * as BABYLON from 'babylonjs';

import { Key } from './key.enum';

const SELECTION_VOXEL = 'selectionVoxel';

@Component({
  selector: 'spt-babylon',
  styleUrls: [ './babylon.component.scss' ],
  templateUrl: './babylon.component.html',
})
export class BabylonComponent implements AfterViewInit {

  @ViewChild('canvas') private canvasRef: ElementRef;

  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;
  private camera: BABYLON.FreeCamera;
  private selectionVoxel: BABYLON.Mesh;

  public constructor(private readonly zone: NgZone) {
  }

  public ngAfterViewInit(): void {
    this.engine = new BABYLON.Engine(this.canvasRef.nativeElement, true);
    this.createScene(this.engine);

    // Needs to run outside Angular zone due:
    // Failed: Timed out waiting for asynchronous Angular tasks to finish after 11 seconds.
    this.zone.runOutsideAngular(() => {
      this.animate();
    });
  }

  public createScene(engine: BABYLON.Engine): void {
    this.scene = new BABYLON.Scene(engine);
    this.scene.onPointerUp = (event: PointerEvent, pickInfo: BABYLON.PickingInfo) => {
      this.onMouseUp(pickInfo);
    };

    this.camera = this.createFreeCamera();
    this.camera.attachControl(this.canvasRef.nativeElement, false);

    new BABYLON.HemisphericLight(
      'hemisphericLight',
      new BABYLON.Vector3(0, 1, 0),
      this.scene,
    );

    this.addVoxel(BABYLON.Vector3.Zero());
    this.selectionVoxel = this.addVoxel(BABYLON.Vector3.Zero(), SELECTION_VOXEL);
    this.selectionVoxel.isVisible = false;
  }

  private createFreeCamera(): BABYLON.FreeCamera {
    const camera = new BABYLON.FreeCamera('freeCamera', new BABYLON.Vector3(0, 5, -10), this.scene);
    camera.keysUp.push(Key.W);
    camera.keysLeft.push(Key.A);
    camera.keysDown.push(Key.S);
    camera.keysRight.push(Key.D);
    camera.setTarget(BABYLON.Vector3.Zero());

    return camera;
  }

  private animate(): void {
    this.engine.runRenderLoop(() => {
      this.showSelectionBox();
      this.scene.render();
    });
  }

  private onMouseUp(pickInfo: BABYLON.PickingInfo): void {
    if (pickInfo.hit) {
      this.selectionVoxel.isVisible = false;
      this.addVoxel(this.selectionVoxel.position);
    }
  }

  private addVoxel(position: BABYLON.Vector3, name?: string): BABYLON.Mesh {
    name = (name) ? name : `voxel${position}`;
    const voxel = BABYLON.MeshBuilder.CreateBox(name, {}, this.scene);
    voxel.position = position;

    return voxel;
  }

  private showSelectionBox(): void {
    const pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
    if (!pickResult) {
      return;
    }

    if (!pickResult.hit) {
      this.selectionVoxel.isVisible = false;
      return;
    }

    if (pickResult.pickedMesh && pickResult.pickedMesh.name === SELECTION_VOXEL) {
      return;
    }

    if (!this.selectionVoxel) {
      return;
    }

    if (pickResult.pickedMesh) {
      this.selectionVoxel.position = pickResult
        .pickedMesh
        .position
        .add(this.getPositionOffset(pickResult.faceId));
      this.selectionVoxel.isVisible = true;
    }
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
        throw new Error('Invalid face id for voxel.');
    }
  }
}
