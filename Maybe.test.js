import Maybe from './Maybe'

const nullMaybe = Maybe.of(null)
const unMaybe = Maybe.of(undefined)
const someMaybe = Maybe.of('some')


describe('Maybe', () => {
  it('knows if it has nothing', () => {
    expect(nullMaybe.isNothing).toEqual(true)
    expect(unMaybe.isNothing).toEqual(true)
  })

  it('knows if it has something', () => {
    expect(someMaybe.isNothing).toEqual(false)
  })

  it('maps correctly', () => {
    expect(someMaybe.map(x => x + '!')).toBeInstanceOf(Maybe)
  })

  it('joins correctly', () => {
    expect(Maybe.of(someMaybe).join().$value).toEqual('some')
  })

  it('chains correctly', () => {
    // exclaim :: String -> String
    const exclaim = (x) => x + '!'
    // safeExclaim :: String -> Maybe String
    const safeExclaim = (x) => Maybe.of(x).map(exclaim)
    const veryExcited = someMaybe.chain(safeExclaim)
    expect(veryExcited.$value).toEqual('some!')
  })
})
