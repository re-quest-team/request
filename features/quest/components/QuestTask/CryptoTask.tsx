import { Button } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/FormElements'
import { useState } from 'react'

const CryptoTask = () => {
  const [encrypted, setEncrypted] = useState('')

  return (
    <div>
      <InputField label="Aufgabenstellung"></InputField>
      <InputField
        label="Codewort"
        onChange={e => setEncrypted(e.target.value)}
      ></InputField>
      <InputField
        label="Verschlüsseltes Wort"
        disabled
        value={encrypted.replace(
          /[A-Z]/gi,
          c =>
            'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'[
              'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.indexOf(c)
            ],
        )}
      ></InputField>
      <Button variant="primary" onClick={() => {}}>
        Speichern
      </Button>
    </div>
  )
}

export default CryptoTask
