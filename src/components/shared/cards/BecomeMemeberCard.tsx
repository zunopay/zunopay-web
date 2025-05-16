'use client'
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MEMBERSHIP_FORM } from "@/constants/general";

export const BecomeMemberCard : React.FC = () => {
  return (
    <Card className="overflow-hidden border-2 border-primary/20 max-w-[800px]">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 pb-8">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl md:text-2xl font-bold">
              Become a Member
            </CardTitle>
            <CardDescription className="text-base mt-1">
              Start earning fees from referred stores
            </CardDescription>
          </div>
          <motion.div
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-xl mb-4">
            Benefits
          </h3>

          <div className="flex items-start gap-3">
            <div className="mt-1 text-primary">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium">Earn Commission</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Get up to 1% in fees from every purchase made at referred
                stores.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1 text-primary">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium">Access Referral Codes</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Onboard your local shops using referral codes
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <ButtonLink
          href={MEMBERSHIP_FORM}
          target="_"
          variant='active'
        >
          Apply Now <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </CardFooter>
    </Card>
  );
}
