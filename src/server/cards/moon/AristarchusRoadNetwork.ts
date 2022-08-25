import {CardName} from '../../../common/cards/CardName';
import {Player} from '../../Player';
import {CardType} from '../../../common/cards/CardType';
import {PlaceMoonRoadTile} from '../../moon/PlaceMoonRoadTile';
import {Tag} from '../../../common/cards/Tag';
import {CardRenderer} from '../render/CardRenderer';
import {TileType} from '../../../common/TileType';
import {Units} from '../../../common/Units';
import {MoonCard} from './MoonCard';
import {AltSecondaryTag} from '../../../common/cards/render/AltSecondaryTag';

export class AristarchusRoadNetwork extends MoonCard {
  constructor() {
    super({
      name: CardName.ARISTARCHUS_ROAD_NETWORK,
      cardType: CardType.AUTOMATED,
      tags: [Tag.MOON],
      cost: 15,
      productionBox: Units.of({megacredits: 2}),
      reserveUnits: Units.of({steel: 2}),
      tr: {moonLogistics: 1},

      metadata: {
        description: 'Spend 2 steel. Increase your M€ production 2 steps. ' +
        'Place a road tile on the Moon and raise the Logistics Rate 1 step.',
        cardNumber: 'M10',
        renderData: CardRenderer.builder((b) => {
          b.minus().steel(2).nbsp.production((eb) => eb.megacredits(2)).br;
          b.moonRoad({secondaryTag: AltSecondaryTag.MOON_LOGISTICS_RATE});
        }),
      },
    }, {
      tilesBuilt: [TileType.MOON_ROAD],
    });
  }

  public play(player: Player) {
    player.game.defer(new PlaceMoonRoadTile(player));
    return undefined;
  }
}