import 'mocha'
import { expect } from 'chai'
import * as fs from 'fs'
import * as path from 'path'
import musicModel from '../models/music'

let jsonFile = path.join(__dirname, 'music.json')

describe('readList method', () => {
  it('should return artist A', () => {
    const result = musicModel.getList(jsonFile)
    expect(result[0].name).to.equal('Artist A')
  })
  it('should return album 3', () => {
    const result = musicModel.getList(jsonFile)
    expect(result[1].albums[0]).to.equal('Album 3')
  })
})

describe('addToList method', () => {
  it('should return artist 1', () => {
    musicModel.addToList('Artist 1', 'Album 0', jsonFile)
    const list = musicModel.getList(jsonFile)
    expect(list[0].name).to.equal('Artist 1')
    expect(list[0].albums[0]).to.equal('Album 0')
  })
  it('should return artist B', () => {
    musicModel.addToList('Artist B', 'Album 2', jsonFile)
    const list = musicModel.getList(jsonFile)
    expect(list[1].name).to.equal('Artist B')
    expect(list[1].albums[0]).to.equal('Album 2')
  })
  it('should return album 4', () => {
    musicModel.addToList('Artist C', 'Album 4', jsonFile)
    const list = musicModel.getList(jsonFile)
    expect(list[1].name).to.equal('Artist C')
    expect(list[1].albums[1]).to.equal('Album 4')
  })
  it('should return album 6', () => {
    musicModel.addToList('Artist C', 'Album 6', jsonFile)
    const list = musicModel.getList(jsonFile)
    expect(list[1].albums[2]).to.equal('Album 6')
  })
  it('should return artist D, album 6', () => {
    musicModel.addToList('Artist D', 'Album 6', jsonFile)
    const list = musicModel.getList(jsonFile)
    expect(list[2].name).to.equal('Artist D')
    expect(list[2].albums[0]).to.equal('Album 6')
  })
  afterEach('reset test data', () => {
    let data = {"artists":[{"name":"Artist A","albums":["Album 1"]},{"name":"Artist C","albums":["Album 3","Album 5"]}]}
    fs.writeFileSync(jsonFile, JSON.stringify(data), 'utf-8')
  })
})
