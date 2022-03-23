import React from 'react';
import {
  Edge,
  SafeAreaView as SAV,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

type Props = SafeAreaViewProps & {
  omitEdges?: string[];
};

const DEFAULT_EDGES: ReadonlyArray<Edge> = ['right', 'bottom', 'left', 'top'];

export function SafeAreaView({
  children,
  omitEdges,
  ...props
}: Props): JSX.Element {
  const edges = DEFAULT_EDGES.filter(edge => !omitEdges?.includes(edge));

  return (
    <SAV {...props} edges={edges}>
      {children}
    </SAV>
  );
}
