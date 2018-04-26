import 'mocha'
import * as fs from 'fs'
import * as path from 'path'
import { expect } from 'chai'
import { musicModel } from '../models/music'

describe('readList method', () => {
  it('should return artist 1', () => {
    const result = musicModel.readList(path.join(__dirname, 'music.json'))
    expect(result[0].name).to.equal('Artist 1')
  })
  it('should return album 3', () => {
    const result = musicModel.readList(path.join(__dirname, 'music.json'))
    expect(result[1].albums[1]).to.equal('Album 3')
  })
})
