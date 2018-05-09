import { BoardState, displayState } from '../models/Boardstate';
import { Coord } from '../models/Coord';

export class BoardHelper {

  // convert id to coordinate
  public static idToCoord(id: number): Coord {
    const coord: Coord = new Coord();
    coord.x = id % 4;
    coord.y = Math.floor(id / 4);

    return coord;
  }

  // convert coordinate to id
  public static coordToId(coord: Coord): number {
    return (coord.y * 4) + (coord.x);
  }

  // Check if coordinate is valid
  public static isValidCoord(coord: Coord): boolean {
    return ((coord.x >= 0 && coord.x < 4) && (coord.y >= 0 && coord.y < 4));
  }

  // check if id is valid
  public static isValidId(id: number): boolean {
    return (id >= 0 && id < 16);
  }

  // Get valid neighbouring items
  public static getNeighbouringItems(arg: number | Coord): Array<number> {
    const neighBouringItems: Array<number> = [];
    let coord: Coord;
    // convert id to coord
    if (typeof(arg) === 'number') {
      coord = this.idToCoord(arg);
    } else if (arg instanceof Coord) {
      coord = arg;
    }

    // Check if coord is assigned and if it is valid
    if (coord && this.isValidCoord(coord)) {
      if (this.isValidCoord(new Coord(coord.x + 1, coord.y))) {
        neighBouringItems.push(this.coordToId(new Coord(coord.x + 1, coord.y)));
      }

      if (this.isValidCoord(new Coord(coord.x + 1, coord.y - 1))) {
        neighBouringItems.push(this.coordToId(new Coord(coord.x + 1, coord.y - 1)));
      }

      if (this.isValidCoord(new Coord(coord.x, coord.y - 1))) {
        neighBouringItems.push(this.coordToId(new Coord(coord.x, coord.y - 1)));
      }

      if (this.isValidCoord(new Coord(coord.x - 1, coord.y - 1))) {
        neighBouringItems.push(this.coordToId(new Coord(coord.x - 1, coord.y - 1)));
      }

      if (this.isValidCoord(new Coord(coord.x - 1, coord.y))) {
        neighBouringItems.push(this.coordToId(new Coord(coord.x - 1, coord.y)));
      }

      if (this.isValidCoord(new Coord(coord.x - 1, coord.y + 1))) {
        neighBouringItems.push(this.coordToId(new Coord(coord.x - 1, coord.y + 1)));
      }

      if (this.isValidCoord(new Coord(coord.x, coord.y + 1))) {
        neighBouringItems.push(this.coordToId(new Coord(coord.x, coord.y + 1)));
      }

      if (this.isValidCoord(new Coord(coord.x + 1, coord.y + 1))) {
        neighBouringItems.push(this.coordToId(new Coord(coord.x + 1, coord.y + 1)));
      }
    }

    return neighBouringItems;
  }
}
