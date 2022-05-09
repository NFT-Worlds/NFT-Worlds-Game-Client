# NFT Worlds Game Client

The NFT Worlds Game Client is the portal for players on PC, Mac and Linux systems to play the most immersive version of NFT Worlds.

The game client is currently in a very early alpha stage. [Please report any bugs or issues you encounter](https://github.com/NFT-Worlds/NFT-Worlds-Game-Client/issues/new).

## Troubleshooting
If you're having trouble with the launcher, delete your `.nftworlds` folder which can be found:
- Windows: Press Start and type `%appdata%`. The folder to delete is in `C:\Users\YourUser\AppData\Roaming`
- macOS/Linux: Your home folder contains the `.nftworlds` directory.

## Building
To build the client as an installer, run `yarn run dist`  
To build the client as an unpackaged directory, run `yarn run dist:bare`

Both will output the result to the `dist` directory.

## Developing
To run the HMR dev server, run `yarn run dev`

## Publishing a Release
1. Bump the `package.json` version and commit the change
2. Tag the commit in the format `v0.0.0`
3. Push the commit and the tag to GitHub with `git push && git push --tags`
4. Wait for the [Publish Workflow](https://github.com/NFT-Worlds/NFT-Worlds-Game-Client/actions/workflows/publish.yml) to complete
5. Find the newly created draft release under the [Releases](https://github.com/NFT-Worlds/NFT-Worlds-Game-Client/releases) section
6. Fill in the release title and description and publish!
