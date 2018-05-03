import 'mocha'
import { expect } from 'chai'
import * as fs from 'fs'
import * as path from 'path'
import musicModel from '../models/music'

const jsonFile: string = path.join(__dirname, 'music.json')

describe('readList', () => {
  it('should return the correct list', () => {
    const list = musicModel.getList(jsonFile)
    expect(list[0].name).to.equal('Artist A')
    expect(list[0].albums[0]).to.equal('Album 1')
    expect(list[1].name).to.equal('Artist C')
    expect(list[1].albums[0]).to.equal('Album 3')
    expect(list[1].albums[1]).to.equal('Album 5')
  })
})

describe('addToList', () => {
  it('should add artist 1, album 0', () => {
    const list = musicModel.addToList('Artist 1', 'Album 0', jsonFile)
    expect(list[0].name).to.equal('Artist 1')
    expect(list[0].albums[0]).to.equal('Album 0')
  })
  it('should add artist B, album 2', () => {
    const list = musicModel.addToList('Artist B', 'Album 2', jsonFile)
    expect(list[1].name).to.equal('Artist B')
    expect(list[1].albums[0]).to.equal('Album 2')
  })
  it('should add artist C, album 4', () => {
    const list = musicModel.addToList('Artist C', 'Album 4', jsonFile)
    expect(list[1].name).to.equal('Artist C')
    expect(list[1].albums[1]).to.equal('Album 4')
  })
  it('should add artist C, album 6', () => {
    const list = musicModel.addToList('Artist C', 'Album 6', jsonFile)
    expect(list[1].name).to.equal('Artist C')
    expect(list[1].albums[2]).to.equal('Album 6')
  })
  it('should add artist D, album 6', () => {
    const list = musicModel.addToList('Artist D', 'Album 6', jsonFile)
    expect(list[2].name).to.equal('Artist D')
    expect(list[2].albums[0]).to.equal('Album 6')
  })
  afterEach('reset test data', () => {
    const data = {"artists":[{"name":"Artist A","albums":["Album 1"]},{"name":"Artist C","albums":["Album 3","Album 5"]}]}
    fs.writeFileSync(jsonFile, JSON.stringify(data), 'utf-8')
  })
})
