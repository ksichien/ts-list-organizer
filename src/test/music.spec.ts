import 'mocha'
import { expect } from 'chai'
import * as fs from 'fs'
import * as path from 'path'
import musicModel from '../models/music'

const jsonFile: string = path.join(__dirname, 'music.json')

describe('readList', () => {
  before('set test data', () => {
    const data = {"artists":[{"name":"Artist A","albums":["Album 1"]},{"name":"Artist B","albums":["Album 2","Album 3"]}]}
    fs.writeFileSync(jsonFile, JSON.stringify(data), 'utf-8')
  })
  it('should return the correct list', () => {
    const list = musicModel.getList(jsonFile)
    expect(list[0].name).to.equal('Artist A')
    expect(list[0].albums[0]).to.equal('Album 1')
    expect(list[1].name).to.equal('Artist B')
    expect(list[1].albums[0]).to.equal('Album 2')
    expect(list[1].albums[1]).to.equal('Album 3')
  })
})

describe('addToList', () => {
  beforeEach('set test data', () => {
    const data = {"artists":[{"name":"Artist A","albums":["Album 1"]},{"name":"Artist C","albums":["Album 3","Album 5"]}]}
    fs.writeFileSync(jsonFile, JSON.stringify(data), 'utf-8')
  })
  it('should add artist 1 and album 0', () => {
    const list = musicModel.addToList('Artist 1', 'Album 0', jsonFile)
    expect(list[0].name).to.equal('Artist 1')
    expect(list[0].albums[0]).to.equal('Album 0')
  })
  it('should add artist B and album 2', () => {
    const list = musicModel.addToList('Artist B', 'Album 2', jsonFile)
    expect(list[1].name).to.equal('Artist B')
    expect(list[1].albums[0]).to.equal('Album 2')
  })
  it('should add album 4 to artist C', () => {
    const list = musicModel.addToList('Artist C', 'Album 4', jsonFile)
    expect(list[1].name).to.equal('Artist C')
    expect(list[1].albums[1]).to.equal('Album 4')
  })
  it('should add album 6 to artist C', () => {
    const list = musicModel.addToList('Artist C', 'Album 6', jsonFile)
    expect(list[1].name).to.equal('Artist C')
    expect(list[1].albums[2]).to.equal('Album 6')
  })
  it('should add artist D and album 6', () => {
    const list = musicModel.addToList('Artist D', 'Album 6', jsonFile)
    expect(list[2].name).to.equal('Artist D')
    expect(list[2].albums[0]).to.equal('Album 6')
  })
})

describe('removeFromList', () => {
  beforeEach('set test data', () => {
    const data = {"artists":[{"name":"Artist A","albums":["Album 1"]},{"name":"Artist B","albums":["Album 2","Album 3","Album 4"]}]}
    fs.writeFileSync(jsonFile, JSON.stringify(data), 'utf-8')
  })
  it('should remove artist A and album 1', () => {

  })
  it('should remove album 3 from artist B', () => {

  })
})
