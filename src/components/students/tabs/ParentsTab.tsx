
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";
import { Student } from "../types/student";
import FatherSection from "./parents/FatherSection";
import MotherSection from "./parents/MotherSection";

interface ParentsTabProps {
  student: Student;
  onChange?: (field: string, value: any) => void;
}

const ParentsTab: React.FC<ParentsTabProps> = ({ student, onChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informazioni Genitori</CardTitle>
        <CardDescription>Dati di contatto e informazioni dei genitori o tutori</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <FatherSection student={student} onChange={onChange} />
          
          <Separator />
          
          <MotherSection student={student} onChange={onChange} />

          {!onChange && (
            <div className="flex justify-end mt-6">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salva Modifiche
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ParentsTab;
