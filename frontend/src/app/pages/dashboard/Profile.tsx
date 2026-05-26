import { useState } from 'react'
import { motion } from 'motion/react'
import { User, Lock, Trash2 } from 'lucide-react'
import Card from '../../components/Card'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [profile, setProfile] = useState({
    nombre: 'María Pérez',
    edad: '32',
    estado: 'Ciudad de México',
    email: 'maria@correo.com',
  })
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })

  const handleSaveProfile = () => setEditing(false)
  const handleChangePassword = () => {
    setPasswords({ current: '', new: '', confirm: '' })
    setChangingPassword(false)
  }
  const handleDeleteAccount = () => setShowDeleteConfirm(false)

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-heading font-bold">Perfil</h1>

      {/* Personal Info */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-heading font-semibold">Información personal</h2>
          </div>
          {!editing && (
            <Button variant="ghost" onClick={() => setEditing(true)}>
              Editar información
            </Button>
          )}
        </div>
        {editing ? (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Nombre" value={profile.nombre} onChange={(e) => setProfile({ ...profile, nombre: e.target.value })} />
              <Input label="Edad" type="number" value={profile.edad} onChange={(e) => setProfile({ ...profile, edad: e.target.value })} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Estado" value={profile.estado} onChange={(e) => setProfile({ ...profile, estado: e.target.value })} />
              <Input label="Email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSaveProfile}>Guardar</Button>
              <Button variant="ghost" onClick={() => setEditing(false)}>Cancelar</Button>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {Object.entries(profile).map(([key, value]) => (
              <div key={key}>
                <p className="text-sm text-muted-foreground capitalize">{key}</p>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Security */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-info" />
            </div>
            <h2 className="text-xl font-heading font-semibold">Seguridad</h2>
          </div>
          {!changingPassword && (
            <Button variant="ghost" onClick={() => setChangingPassword(true)}>
              Cambiar contraseña
            </Button>
          )}
        </div>
        {changingPassword && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 overflow-hidden"
          >
            <Input label="Contraseña actual" type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} />
            <Input label="Nueva contraseña" type="password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} />
            <Input label="Confirmar nueva contraseña" type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} />
            <div className="flex gap-3">
              <Button onClick={handleChangePassword}>Guardar</Button>
              <Button variant="ghost" onClick={() => setChangingPassword(false)}>Cancelar</Button>
            </div>
          </motion.div>
        )}
      </Card>

      {/* Delete Account */}
      <Card className="border-destructive/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold">Eliminar cuenta</h2>
              <p className="text-sm text-muted-foreground">Esta acción es permanente</p>
            </div>
          </div>
          {!showDeleteConfirm ? (
            <Button variant="outline" onClick={() => setShowDeleteConfirm(true)}>
              Eliminar
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>Cancelar</Button>
              <Button onClick={handleDeleteAccount}>Confirmar</Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
