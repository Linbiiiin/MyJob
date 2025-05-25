import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { useMineCurriculumVitae } from './hooks';

const MineCurriculumVitae = () => {
  const {} = useMineCurriculumVitae();

  return (
    <Text>MineCurriculumVitae</Text>
  );
};

const styles = StyleSheet.create({});

export default MineCurriculumVitae;
