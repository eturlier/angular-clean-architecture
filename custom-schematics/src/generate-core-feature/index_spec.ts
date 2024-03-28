import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('generate-core-feature', () => {
    it('works', async () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        const tree = await runner.runSchematic(
            'generate-core-feature',
            {},
            Tree.empty()
        );

        expect(tree.files).toEqual([]);
    });
});
