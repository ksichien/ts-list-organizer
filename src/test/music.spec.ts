import 'mocha'
import * as fs from 'fs'
import * as path from 'path'
import { expect } from 'chai'
import musicModel from '../models/music'

let jsonFile = path.join(__dirname, 'music.json')

describe('readList method', () => {
  it('should return artist 1', () => {
    const result = musicModel.getList(jsonFile)
    expect(result[0].name).to.equal('Artist 1')
  })
  it('should return album 2', () => {
    const result = musicModel.getList(jsonFile)
    expect(result[1].albums[0]).to.equal('Album 2')
  })
})

describe('addAlbum method', () => {
  it('should return album 3', () => {
    musicModel.addToList('Artist 2', 'Album 3', jsonFile)
    const list = musicModel.getList(jsonFile)
    expect(list[1].name).to.equal('Artist 2')
    expect(list[1].albums[1]).to.equal('Album 3')
  })
  it('should return album 5', () => {
    musicModel.addToList('Artist 2', 'Album 5', jsonFile)
    const list = musicModel.getList(jsonFile)
    expect(list[1].albums[2]).to.equal('Album 5')
  })
  it('should return album 6', () => {
    musicModel.addToList('Artist 3', 'Album 6', jsonFile)
    const list = musicModel.getList(jsonFile)
    expect(list[2].name).to.equal('Artist 3')
    expect(list[2].albums[0]).to.equal('Album 6')
  })
  afterEach('reset test data', () => {
    let data = {"artists":[{"name":"Artist 1","albums":["Album 1"]},{"name":"Artist 2","albums":["Album 2","Album 4"]}]}
    fs.writeFileSync(jsonFile, JSON.stringify(data), 'utf-8')
  })
})
