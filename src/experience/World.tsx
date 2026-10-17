import { ArrivalWorld } from './arrival/ArrivalWorld';
import { useWorld } from './WorldController';
import { EntryFormation } from './EntryFormation';
import { Infrastructure } from './systems/Infrastructure';
import { Strata } from './systems/Strata';
import { CameraRig } from './CameraRig';
import { Lighting } from './Lighting';
import { Terrain } from './systems/Terrain';
import { Architecture } from './systems/Architecture';
import { DataField } from './systems/DataField';
import { Pathways } from './systems/Pathways';
import { Territories } from './systems/Territories';
import { Destinations } from './systems/Destinations';
import { LaelWorld } from './projects/LaelWorld';
import { qualitySettings, type Quality } from './quality';
export function World({ quality }: { quality: Quality }) {
  const { state } = useWorld();
  if (state === 'entry')
    return (
      <>
        <CameraRig />
        <ArrivalWorld quality={quality} />
      </>
    );
  const settings = qualitySettings[quality];
  return (
    <>
      <Lighting />
      <CameraRig />
      <Terrain segments={settings.terrainSegments} />
      <DataField count={settings.observations} />
      <EntryFormation>
        <Strata />
        <Infrastructure />
        <Architecture count={settings.structures} />
        <Pathways />
        <Territories />
        <LaelWorld />
      </EntryFormation>
      <Destinations />
    </>
  );
}
