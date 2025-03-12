
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className,
  delay = 0 
}) => {
  return (
    <Card 
      className={cn(
        "card-hover opacity-0", 
        `animate-fade-up-delay-${delay}`,
        className
      )}
    >
      {children}
    </Card>
  );
};

export default AnimatedCard;
