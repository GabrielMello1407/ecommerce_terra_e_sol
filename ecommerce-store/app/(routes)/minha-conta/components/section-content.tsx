'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import Button from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Decorator from '@/components/ui/decorator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';

interface SectionContentProps {
  activeSection: string;
}

const SectionContent: React.FC<SectionContentProps> = ({ activeSection }) => {
  const { isLoaded, user } = useUser();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.primaryEmailAddress?.emailAddress || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdate = async () => {
    if (!user) return;

    try {
      await user.update({
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      toast.success('Dados atualizados com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar os dados.');
    }
  };

  if (!isLoaded || !user) {
    return <p>Carregando...</p>;
  }

  const sections: { [key: string]: JSX.Element } = {
    'Minha Conta': (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="mr-2">
              <Decorator height={4} width={4} />
            </span>
            Minha Conta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Informações da sua conta.</p>
        </CardContent>
      </Card>
    ),
    'Meus dados': (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="mr-2">
              <Decorator height={4} width={4} />
            </span>
            Meus Dados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Nome *</Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Nome"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Sobrenome *</Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Sobrenome"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                disabled
              />
            </div>
            <div className="col-span-2">
              <Button
                type="button"
                className="w-full bg-[#025213]"
                onClick={handleUpdate}
              >
                Atualizar Dados
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    ),
  };

  return sections[activeSection] || <p>Seção não encontrada.</p>;
};

export default SectionContent;
