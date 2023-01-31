import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCharacter } from '../../utils/data/characterData';
import CharacterForm from '../../components/forms/CharacterForm';

export default function EditCharacter() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleCharacter(id).then(setEditItem);
  }, [id]);

  return (<CharacterForm key={id} obj={editItem} />);
}
