import * as fromOrdenespago from '../reducers/ordenespago.reducer';
import { selectOrdenespagoState } from './ordenespago.selectors';

describe('Ordenespago Selectors', () => {
  it('should select the feature state', () => {
    const result = selectOrdenespagoState({
      [fromOrdenespago.ordenespagoFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
